import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<any> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({
      email: dto.email,
      password: hashed,
      name: dto.name || dto.email.split('@')[0],
      role: dto.role || 'user',
    });
    await this.repo.save(user);
    const { password, ...rest } = user as any;
    return rest;
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async all() {
    return this.repo.find();
  }

  async update(id: number, partial: Partial<User>) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException();
    Object.assign(user, partial);
    return this.repo.save(user);
  }
}