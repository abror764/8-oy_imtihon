import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promo } from './promo.entity';
import { PromoUsage } from './promo-usage.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(Promo) private promoRepo: Repository<Promo>,
    @InjectRepository(PromoUsage) private usageRepo: Repository<PromoUsage>,
  ) {}

  create(code: string, percent: number, products: Product[], expiresAt?: Date) {
    const p = this.promoRepo.create({ code, percent, products, expiresAt });
    return this.promoRepo.save(p);
  }

  findByCode(code: string) {
    return this.promoRepo.findOne({ where: { code }, relations: ['products'] });
  }

  async apply(code: string, userId: number, productIds: number[]) {
    const promo = await this.findByCode(code);
    if (!promo) throw new NotFoundException('Promo not found');
    if (promo.expiresAt && promo.expiresAt < new Date()) throw new ForbiddenException('Promo expired');

    const used = await this.usageRepo.findOne({ where: { promo: { id: promo.id }, userId } });
    if (used) throw new ForbiddenException('Promo already used by user');

    const applicableProductIds = promo.products.map((p) => p.id);
    const isApplicable = productIds.some((id) => applicableProductIds.includes(id));
    if (!isApplicable) throw new ForbiddenException('Promo not applicable to selected products');

    const usage = this.usageRepo.create({ promo, userId });
    await this.usageRepo.save(usage);
    return promo;
  }
}