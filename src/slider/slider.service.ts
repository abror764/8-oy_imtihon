import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slider } from './slider.entity';

@Injectable()
export class SliderService {
  constructor(@InjectRepository(Slider) private repo: Repository<Slider>) {}

  create(data: Partial<Slider>) {
    const s = this.repo.create(data);
    return this.repo.save(s);
  }

  findAll() {
    return this.repo.find({ where: { isActive: true } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, update: Partial<Slider>) {
    return this.repo.update(id, update);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}