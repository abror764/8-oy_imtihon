import { Category } from '../categories/category.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';
import { User } from '../users/user.entity';
export declare class Product {
    id: number;
    title: string;
    brand: string;
    category: Category;
    description?: string;
    images: ProductImage[];
    variants: ProductVariant[];
    stock: number;
    price: number;
    isNewArrival: boolean;
    isBestSeller: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
}
