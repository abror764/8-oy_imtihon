import { Product } from './product.entity';
export declare class ProductVariant {
    id: number;
    color: string;
    memory: string;
    stock: number;
    price: number;
    product: Product;
}
