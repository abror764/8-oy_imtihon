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
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/user.entity");
const slider_entity_1 = require("../slider/slider.entity");
const category_entity_1 = require("../categories/category.entity");
const product_entity_1 = require("../products/product.entity");
const product_image_entity_1 = require("../products/product-image.entity");
const product_variant_entity_1 = require("../products/product-variant.entity");
const promo_entity_1 = require("../promo/promo.entity");
const promo_usage_entity_1 = require("../promo/promo-usage.entity");
const cart_entity_1 = require("../cart/cart.entity");
const cart_item_entity_1 = require("../cart/cart-item.entity");
const order_entity_1 = require("../cart/order.entity");
const order_item_entity_1 = require("../cart/order-item.entity");
let TypeOrmConfigService = class TypeOrmConfigService {
    constructor(config) {
        this.config = config;
    }
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: this.config.get('POSTGRES_HOST', 'localhost'),
            port: +this.config.get('POSTGRES_PORT', 5432),
            username: this.config.get('POSTGRES_USER', 'postgres'),
            password: this.config.get('POSTGRES_PASSWORD', 'postgres'),
            database: this.config.get('POSTGRES_DB', 'shopdb'),
            entities: [
                user_entity_1.User,
                slider_entity_1.Slider,
                category_entity_1.Category,
                product_entity_1.Product,
                product_image_entity_1.ProductImage,
                product_variant_entity_1.ProductVariant,
                promo_entity_1.Promo,
                promo_usage_entity_1.PromoUsage,
                cart_entity_1.Cart,
                cart_item_entity_1.CartItem,
                order_entity_1.Order,
                order_item_entity_1.OrderItem,
            ],
            synchronize: true,
            logging: false,
        };
    }
};
exports.TypeOrmConfigService = TypeOrmConfigService;
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeOrmConfigService);
//# sourceMappingURL=typeorm.config.js.map