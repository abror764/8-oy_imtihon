import { Product } from '../products/product.entity';
export declare class Promo {
    id: number;
    code: string;
    percent: number;
    products: Product[];
    expiresAt?: Date;
}
