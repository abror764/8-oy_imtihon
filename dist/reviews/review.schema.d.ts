import { Document } from 'mongoose';
export type ReviewDocument = Review & Document;
export declare class Review {
    seqId: number;
    userId: number;
    productId: number;
    name: string;
    stars: number;
    comment: string;
    profileImage?: string;
    createdAt: Date;
}
export declare const ReviewSchema: import("mongoose").Schema<Review, import("mongoose").Model<Review, any, any, any, Document<unknown, any, Review> & Review & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Review, Document<unknown, {}, import("mongoose").FlatRecord<Review>> & import("mongoose").FlatRecord<Review> & {
    _id: import("mongoose").Types.ObjectId;
}>;
