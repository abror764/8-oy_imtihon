import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;
}