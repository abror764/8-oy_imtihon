import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './like.schema';
import { Counter, CounterDocument } from './counter.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
  ) { }

  private async nextSeq(name = 'likes') {
    const res = await this.counterModel.findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return res.seq;
  }

  async setLike(userId: number, productId: number, liked = true) {
    const existing = await this.likeModel.findOne({ userId, productId });
    if (existing) {
      existing.liked = liked;
      return existing.save();
    }
    const seq = await this.nextSeq('likes');
    const created = new this.likeModel({ seqId: seq, userId, productId, liked });
    return created.save();
  }

  async getLikeStatus(userId: number, productId: number) {
    const existing = await this.likeModel.findOne({ userId, productId });
    return existing ? existing.liked : false;
  }

  async listForUser(userId: number) {
    return this.likeModel.find({ userId });
  }
}
