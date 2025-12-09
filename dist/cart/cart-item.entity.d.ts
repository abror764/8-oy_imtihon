import { Cart } from './cart.entity';
export declare class CartItem {
    id: number;
    cart: Cart;
    productId: number;
    variantId?: number;
    quantity: number;
    price: number;
}
