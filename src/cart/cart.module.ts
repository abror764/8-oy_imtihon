import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsModule } from '../products/products.module';
import { PromoModule } from '../promo/promo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Order, OrderItem]), ProductsModule, PromoModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule { }