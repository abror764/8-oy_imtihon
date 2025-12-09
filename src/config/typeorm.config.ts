import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { Slider } from '../slider/slider.entity';
import { Category } from '../categories/category.entity';
import { Product } from '../products/product.entity';
import { ProductImage } from '../products/product-image.entity';
import { ProductVariant } from '../products/product-variant.entity';
import { Promo } from '../promo/promo.entity';
import { PromoUsage } from '../promo/promo-usage.entity';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';
import { Order } from '../cart/order.entity';
import { OrderItem } from '../cart/order-item.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('POSTGRES_HOST', 'localhost'),
      port: +this.config.get('POSTGRES_PORT', 5432),
      username: this.config.get('POSTGRES_USER', 'postgres'),
      password: this.config.get('POSTGRES_PASSWORD', 'postgres'),
      database: this.config.get('POSTGRES_DB', 'shopdb'),
      entities: [
        User,
        Slider,
        Category,
        Product,
        ProductImage,
        ProductVariant,
        Promo,
        PromoUsage,
        Cart,
        CartItem,
        Order,
        OrderItem,
      ],
      synchronize: true,
      logging: false,
    };
  }
}