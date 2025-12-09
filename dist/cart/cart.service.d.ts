import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { ProductsService } from '../products/products.service';
export declare class CartService {
    private cartRepo;
    private itemRepo;
    private orderRepo;
    private orderItemRepo;
    private productsService;
    constructor(cartRepo: Repository<Cart>, itemRepo: Repository<CartItem>, orderRepo: Repository<Order>, orderItemRepo: Repository<OrderItem>, productsService: ProductsService);
    getCartForUser(userId: number): Promise<Cart>;
    addToCart(userId: number, payload: {
        productId: number;
        variantId?: number;
        quantity: number;
    }): Promise<Cart>;
    buyNow(userId: number, payload: {
        productId: number;
        variantId?: number;
        quantity: number;
        address: string;
        paymentMethod: string;
    }): Promise<Order[]>;
    officialPurchase(orderId: number): Promise<Order>;
    checkoutCart(userId: number, payload: {
        address: string;
        paymentMethod: string;
        promoCode?: string;
    }): Promise<Order[]>;
}
