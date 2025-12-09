import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order, (o) => o.items, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  productId: number;

  @Column({ nullable: true })
  variantId?: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}