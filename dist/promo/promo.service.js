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
exports.PromoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const promo_entity_1 = require("./promo.entity");
const promo_usage_entity_1 = require("./promo-usage.entity");
const typeorm_2 = require("typeorm");
let PromoService = class PromoService {
    constructor(promoRepo, usageRepo) {
        this.promoRepo = promoRepo;
        this.usageRepo = usageRepo;
    }
    create(code, percent, products, expiresAt) {
        const p = this.promoRepo.create({ code, percent, products, expiresAt });
        return this.promoRepo.save(p);
    }
    findByCode(code) {
        return this.promoRepo.findOne({ where: { code }, relations: ['products'] });
    }
    async apply(code, userId, productIds) {
        const promo = await this.findByCode(code);
        if (!promo)
            throw new common_1.NotFoundException('Promo not found');
        if (promo.expiresAt && promo.expiresAt < new Date())
            throw new common_1.ForbiddenException('Promo expired');
        const used = await this.usageRepo.findOne({ where: { promo: { id: promo.id }, userId } });
        if (used)
            throw new common_1.ForbiddenException('Promo already used by user');
        const applicableProductIds = promo.products.map((p) => p.id);
        const isApplicable = productIds.some((id) => applicableProductIds.includes(id));
        if (!isApplicable)
            throw new common_1.ForbiddenException('Promo not applicable to selected products');
        const usage = this.usageRepo.create({ promo, userId });
        await this.usageRepo.save(usage);
        return promo;
    }
};
exports.PromoService = PromoService;
exports.PromoService = PromoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promo_entity_1.Promo)),
    __param(1, (0, typeorm_1.InjectRepository)(promo_usage_entity_1.PromoUsage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PromoService);
//# sourceMappingURL=promo.service.js.map