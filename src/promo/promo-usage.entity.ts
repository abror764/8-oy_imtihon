import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Promo } from './promo.entity';

@Entity('promo_usages')
export class PromoUsage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Promo, { eager: true })
  promo: Promo;

  @Column()
  userId: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  usedAt: Date;
}