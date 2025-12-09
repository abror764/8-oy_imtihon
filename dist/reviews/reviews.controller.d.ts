import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private svc;
    constructor(svc: ReviewsService);
    leave(req: any, body: {
        productId: number;
        name: string;
        stars: number;
        comment: string;
        profileImage?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument> & import("./review.schema").Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    list(productId: string): Promise<(import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument> & import("./review.schema").Review & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
