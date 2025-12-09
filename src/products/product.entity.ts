import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';
import { User } from '../users/user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Index()
  @Column()
  brand: string;

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Column('text', { nullable: true })
  description?: string;

  @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => ProductVariant, (v) => v.product, { cascade: true })
  variants: ProductVariant[];

  @Column({ default: 0 })
  stock: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: false })
  isNewArrival: boolean;

  @Column({ default: false })
  isBestSeller: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { eager: true })
  owner: User;

}