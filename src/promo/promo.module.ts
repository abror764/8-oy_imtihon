import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promo } from './promo.entity';
import { PromoUsage } from './promo-usage.entity';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Promo, PromoUsage]), ProductsModule],
  providers: [PromoService],
  controllers: [PromoController],
  exports: [PromoService],
})
export class PromoModule {}