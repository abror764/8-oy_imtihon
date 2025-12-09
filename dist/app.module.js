"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const slider_module_1 = require("./slider/slider.module");
const categories_module_1 = require("./categories/categories.module");
const products_module_1 = require("./products/products.module");
const likes_module_1 = require("./likes/likes.module");
const reviews_module_1 = require("./reviews/reviews.module");
const promo_module_1 = require("./promo/promo.module");
const cart_module_1 = require("./cart/cart.module");
const uploads_module_1 = require("./uploads/uploads.module");
const typeorm_config_1 = require("./config/typeorm.config");
const mongoose_config_1 = require("./config/mongoose.config");
const config_2 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_config_1.TypeOrmConfigService,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_1.MongooseConfigService,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            slider_module_1.SliderModule,
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            likes_module_1.LikesModule,
            reviews_module_1.ReviewsModule,
            promo_module_1.PromoModule,
            cart_module_1.CartModule,
            uploads_module_1.UploadsModule,
        ],
        controllers: [],
        providers: [config_2.ConfigService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map