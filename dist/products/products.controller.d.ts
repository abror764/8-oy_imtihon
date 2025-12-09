import { ProductsService } from './products.service';
export declare class ProductsController {
    private svc;
    constructor(svc: ProductsService);
    create(body: any): Promise<import("./product.entity").Product>;
    list(q: any): Promise<{
        items: import("./product.entity").Product[];
        total: number;
        page: number;
        pages: number;
    }>;
    get(id: string): Promise<import("./product.entity").Product>;
    update(id: string, body: any): Promise<import("./product.entity").Product>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
