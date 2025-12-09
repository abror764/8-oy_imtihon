import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Product, (p) => p.images, { onDelete: 'CASCADE' })
  product: Product;
}