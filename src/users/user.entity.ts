import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export type UserRole = 'user' | 'seller' | 'admin';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number; 

  @Index({ unique: true })
  @Column({ length: 200 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'varchar', default: 'user' })
  role: UserRole;

  @Column({ nullable: true })
  profileImage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}