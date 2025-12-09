import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('promos')
export class Promo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  code: string;

  @Column('int')
  percent: number;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'promo_products' })
  products: Product[];

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt?: Date;
}