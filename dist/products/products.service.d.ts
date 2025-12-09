import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';
import { CategoriesService } from '../categories/categories.service';
export declare class ProductsService {
    private repo;
    private imgRepo;
    private varRepo;
    private categoriesService;
    constructor(repo: Repository<Product>, imgRepo: Repository<ProductImage>, varRepo: Repository<ProductVariant>, categoriesService: CategoriesService);
    create(data: any): Promise<Product>;
    findById(id: number): Promise<Product>;
    update(id: number, update: Partial<Product>): Promise<Product>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    paginateAndFilter(query: {
        page?: number;
        brand?: string;
        memory?: string;
        color?: string;
        minPrice?: number;
        maxPrice?: number;
        category?: string;
        featured?: boolean;
        bestseller?: boolean;
        newArrival?: boolean;
    }): Promise<{
        items: Product[];
        total: number;
        page: number;
        pages: number;
    }>;
}
