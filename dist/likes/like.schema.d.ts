import { Document } from 'mongoose';
export type LikeDocument = Like & Document;
export declare class Like {
    seqId: number;
    userId: number;
    productId: number;
    liked: boolean;
    createdAt: Date;
}
export declare const LikeSchema: import("mongoose").Schema<Like, import("mongoose").Model<Like, any, any, any, Document<unknown, any, Like> & Like & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Like, Document<unknown, {}, import("mongoose").FlatRecord<Like>> & import("mongoose").FlatRecord<Like> & {
    _id: import("mongoose").Types.ObjectId;
}>;
