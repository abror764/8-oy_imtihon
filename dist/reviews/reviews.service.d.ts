import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { CounterDocument } from '../likes/counter.schema';
import { Repository } from 'typeorm';
import { Order } from '../cart/order.entity';
export declare class ReviewsService {
    private reviewModel;
    private counterModel;
    private orderRepo;
    constructor(reviewModel: Model<ReviewDocument>, counterModel: Model<CounterDocument>, orderRepo: Repository<Order>);
    private nextSeq;
    private userBoughtProduct;
    leaveReview(userId: number, productId: number, payload: {
        name: string;
        stars: number;
        comment: string;
        profileImage?: string;
    }): Promise<import("mongoose").Document<unknown, {}, ReviewDocument> & Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    forProduct(productId: number): Promise<(import("mongoose").Document<unknown, {}, ReviewDocument> & Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
