import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { Counter, CounterDocument } from '../likes/counter.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../cart/order.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  private async nextSeq(name = 'reviews') {
    const res = await this.counterModel.findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, returnDocument: 'after' as any },
    );
    return res.seq;
  }

  private async userBoughtProduct(userId: number, productId: number) {
    const order = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .where('order.userId = :userId', { userId })
      .andWhere('items.productId = :productId', { productId })
      .andWhere('order.status = :status', { status: 'completed' })
      .getOne();
    return !!order;
  }

  async leaveReview(userId: number, productId: number, payload: { name: string; stars: number; comment: string; profileImage?: string }) {
    const bought = await this.userBoughtProduct(userId, productId);
    if (!bought) {
      throw new ForbiddenException('Only buyers can leave reviews');
    }
    const seq = await this.nextSeq('reviews');
    const created = new this.reviewModel({
      seqId: seq,
      userId,
      productId,
      ...payload,
    });
    return created.save();
  }

  async forProduct(productId: number) {
    return this.reviewModel.find({ productId }).sort({ createdAt: -1 });
  }
}