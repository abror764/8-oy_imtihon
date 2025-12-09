import { Promo } from './promo.entity';
import { PromoUsage } from './promo-usage.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
export declare class PromoService {
    private promoRepo;
    private usageRepo;
    constructor(promoRepo: Repository<Promo>, usageRepo: Repository<PromoUsage>);
    create(code: string, percent: number, products: Product[], expiresAt?: Date): Promise<Promo>;
    findByCode(code: string): Promise<Promo>;
    apply(code: string, userId: number, productIds: number[]): Promise<Promo>;
}
