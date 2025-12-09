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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoUsage = void 0;
const typeorm_1 = require("typeorm");
const promo_entity_1 = require("./promo.entity");
let PromoUsage = class PromoUsage {
};
exports.PromoUsage = PromoUsage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], PromoUsage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => promo_entity_1.Promo, { eager: true }),
    __metadata("design:type", promo_entity_1.Promo)
], PromoUsage.prototype, "promo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PromoUsage.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], PromoUsage.prototype, "usedAt", void 0);
exports.PromoUsage = PromoUsage = __decorate([
    (0, typeorm_1.Entity)('promo_usages')
], PromoUsage);
//# sourceMappingURL=promo-usage.entity.js.map