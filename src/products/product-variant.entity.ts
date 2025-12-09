import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  color: string;

  @Column()
  memory: string;

  @Column({ default: 0 })
  stock: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @ManyToOne(() => Product, (p) => p.variants, { onDelete: 'CASCADE' })
  product: Product;
}