import { CartService } from './cart.service';
export declare class CartController {
    private svc;
    constructor(svc: CartService);
    get(req: any): Promise<import("./cart.entity").Cart>;
    add(req: any, body: {
        productId: number;
        variantId?: number;
        quantity: number;
    }): Promise<import("./cart.entity").Cart>;
    buyNow(req: any, body: {
        productId: number;
        variantId?: number;
        quantity: number;
        address: string;
        paymentMethod: string;
    }): Promise<import("./order.entity").Order[]>;
    checkout(req: any, body: {
        address: string;
        paymentMethod: string;
        promoCode?: string;
    }): Promise<import("./order.entity").Order[]>;
    finalize(orderId: string): Promise<import("./order.entity").Order>;
}
