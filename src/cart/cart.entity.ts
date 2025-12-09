import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @OneToMany(() => CartItem, (i) => i.cart, { cascade: true, eager: true })
  items: CartItem[];

  @CreateDateColumn()
  createdAt: Date;
}