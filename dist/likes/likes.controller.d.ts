import { LikesService } from './likes.service';
export declare class LikesController {
    private svc;
    constructor(svc: LikesService);
    toggle(req: any, body: {
        productId: number;
        liked: boolean;
    }): Promise<import("mongoose").Document<unknown, {}, import("./like.schema").LikeDocument> & import("./like.schema").Like & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    list(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./like.schema").LikeDocument> & import("./like.schema").Like & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    status(req: any, productId: string): Promise<boolean>;
}
