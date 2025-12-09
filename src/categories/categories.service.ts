import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {

    this.bootstrap();
  }

  private async bootstrap() {
    const names = ['phone', 'smart watches', 'camera', 'headphones', 'computers', 'gaming'];
    for (const name of names) {
      const exists = await this.repo.findOne({ where: { name } });
      if (!exists) {
        const c = this.repo.create({ name });
        await this.repo.save(c);
      }
    }
  }

  all() {
    return this.repo.find();
  }

  findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(name: string) {
    const c = this.repo.create({ name });
    return this.repo.save(c);
  }
}