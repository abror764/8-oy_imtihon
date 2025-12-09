import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Cart, (c) => c.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @Column()
  productId: number;

  @Column({ nullable: true })
  variantId?: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}