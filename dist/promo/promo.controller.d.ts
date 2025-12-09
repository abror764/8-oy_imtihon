import { PromoService } from './promo.service';
export declare class PromoController {
    private svc;
    constructor(svc: PromoService);
    create(body: {
        code: string;
        percent: number;
        productIds: number[];
        expiresAt?: string;
    }): Promise<import("./promo.entity").Promo>;
    apply(req: any, body: {
        code: string;
        productIds: number[];
    }): Promise<import("./promo.entity").Promo>;
}
