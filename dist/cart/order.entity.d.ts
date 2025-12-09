import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    userId: number;
    items: OrderItem[];
    totalPrice: number;
    totalItems: number;
    address: string;
    paymentMethod: string;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
}
