import { Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoriesService {
    private repo;
    constructor(repo: Repository<Category>);
    private bootstrap;
    all(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
    findById(id: number): Promise<Category>;
    create(name: string): Promise<Category>;
}
