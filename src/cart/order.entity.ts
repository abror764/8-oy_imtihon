import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @OneToMany(() => OrderItem, (i) => i.order, { cascade: true, eager: true })
  items: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @Column()
  totalItems: number;

  @Column()
  address: string;

  @Column()
  paymentMethod: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;
}