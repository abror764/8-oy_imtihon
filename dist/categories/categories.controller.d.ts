import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private svc;
    constructor(svc: CategoriesService);
    list(): Promise<import("./category.entity").Category[]>;
    get(id: string): Promise<import("./category.entity").Category>;
    create(name: string): Promise<import("./category.entity").Category>;
}
