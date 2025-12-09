"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const product_image_entity_1 = require("./product-image.entity");
const product_variant_entity_1 = require("./product-variant.entity");
const categories_service_1 = require("../categories/categories.service");
let ProductsService = class ProductsService {
    constructor(repo, imgRepo, varRepo, categoriesService) {
        this.repo = repo;
        this.imgRepo = imgRepo;
        this.varRepo = varRepo;
        this.categoriesService = categoriesService;
    }
    async create(data) {
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
    async findById(id) {
        return this.repo.findOne({ where: { id }, relations: ['images', 'variants', 'category'] });
    }
    async update(id, update) {
        await this.repo.update(id, update);
        return this.findById(id);
    }
    async delete(id) {
        return this.repo.delete(id);
    }
    async paginateAndFilter(query) {
        const page = query.page && query.page > 0 ? query.page : 1;
        const take = 10;
        const qb = this.repo.createQueryBuilder('product').leftJoinAndSelect('product.images', 'images').leftJoinAndSelect('product.variants', 'variants').leftJoinAndSelect('product.category', 'category');
        if (query.brand)
            qb.andWhere('product.brand ILIKE :brand', { brand: `%${query.brand}%` });
        if (query.category)
            qb.andWhere('category.name = :cat', { cat: query.category });
        if (query.minPrice)
            qb.andWhere('product.price >= :minPrice', { minPrice: query.minPrice });
        if (query.maxPrice)
            qb.andWhere('product.price <= :maxPrice', { maxPrice: query.maxPrice });
        if (query.featured)
            qb.andWhere('product.isFeatured = true');
        if (query.bestseller)
            qb.andWhere('product.isBestSeller = true');
        if (query.newArrival)
            qb.andWhere('product.isNewArrival = true');
        if (query.memory)
            qb.andWhere('variants.memory = :memory', { memory: query.memory });
        if (query.color)
            qb.andWhere('variants.color = :color', { color: query.color });
        qb.orderBy('product.createdAt', 'DESC').skip((page - 1) * take).take(take);
        const [items, total] = await qb.getManyAndCount();
        return { items, total, page, pages: Math.ceil(total / take) };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(product_image_entity_1.ProductImage)),
    __param(2, (0, typeorm_1.InjectRepository)(product_variant_entity_1.ProductVariant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        categories_service_1.CategoriesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map