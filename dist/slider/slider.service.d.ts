import { Repository } from 'typeorm';
import { Slider } from './slider.entity';
export declare class SliderService {
    private repo;
    constructor(repo: Repository<Slider>);
    create(data: Partial<Slider>): Promise<Slider>;
    findAll(): Promise<Slider[]>;
    findById(id: number): Promise<Slider>;
    update(id: number, update: Partial<Slider>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
