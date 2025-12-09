import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like as TypeORMLike } from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(ProductImage) private imgRepo: Repository<ProductImage>,
    @InjectRepository(ProductVariant) private varRepo: Repository<ProductVariant>,
    private categoriesService: CategoriesService,
  ) {}

  async create(data: any) {
    const category = data.categoryName ? await this.categoriesService.findByName(data.categoryName) : null;
    const p = this.repo.create({
      title: data.title,
      brand: data.brand,
      price: data.price,
      description: data.description,
      category,
      isFeatured: !!data.isFeatured,
      isBestSeller: !!data.isBestSeller,
      isNewArrival: !!data.isNewArrival,
      stock: data.stock || 0,
    });
    const saved = await this.repo.save(p);

    if (data.images) {
      for (const url of data.images) {
        const img = this.imgRepo.create({ url, product: saved });
        await this.imgRepo.save(img);
      }
    }

    if (data.variants) {
      for (const v of data.variants) {
        const variant = this.varRepo.create({ ...v, product: saved });
        await this.varRepo.save(variant);
      }
    }

    return this.findById(saved.id);
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['images', 'variants', 'category'] });
  }

  async update(id: number, update: Partial<Product>) {
    await this.repo.update(id, update);
    return this.findById(id);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }

  async paginateAndFilter(query: {
    page?: number;
    brand?: string;
    memory?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    featured?: boolean;
    bestseller?: boolean;
    newArrival?: boolean;
  }) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const take = 10;
    const qb = this.repo.createQueryBuilder('product').leftJoinAndSelect('product.images', 'images').leftJoinAndSelect('product.variants', 'variants').leftJoinAndSelect('product.category', 'category');

    if (query.brand) qb.andWhere('product.brand ILIKE :brand', { brand: `%${query.brand}%` });
    if (query.category) qb.andWhere('category.name = :cat', { cat: query.category });
    if (query.minPrice) qb.andWhere('product.price >= :minPrice', { minPrice: query.minPrice });
    if (query.maxPrice) qb.andWhere('product.price <= :maxPrice', { maxPrice: query.maxPrice });
    if (query.featured) qb.andWhere('product.isFeatured = true');
    if (query.bestseller) qb.andWhere('product.isBestSeller = true');
    if (query.newArrival) qb.andWhere('product.isNewArrival = true');
    if (query.memory) qb.andWhere('variants.memory = :memory', { memory: query.memory });
    if (query.color) qb.andWhere('variants.color = :color', { color: query.color });

    qb.orderBy('product.createdAt', 'DESC').skip((page - 1) * take).take(take);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pages: Math.ceil(total / take) };
  }
}