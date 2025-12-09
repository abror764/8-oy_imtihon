import { Model } from 'mongoose';
import { Like, LikeDocument } from './like.schema';
import { CounterDocument } from './counter.schema';
export declare class LikesService {
    private likeModel;
    private counterModel;
    constructor(likeModel: Model<LikeDocument>, counterModel: Model<CounterDocument>);
    private nextSeq;
    setLike(userId: number, productId: number, liked?: boolean): Promise<import("mongoose").Document<unknown, {}, LikeDocument> & Like & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getLikeStatus(userId: number, productId: number): Promise<boolean>;
    listForUser(userId: number): Promise<(import("mongoose").Document<unknown, {}, LikeDocument> & Like & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
