import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SliderModule } from './slider/slider.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { LikesModule } from './likes/likes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PromoModule } from './promo/promo.module';
import { CartModule } from './cart/cart.module';
import { UploadsModule } from './uploads/uploads.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { MongooseConfigService } from './config/mongoose.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UsersModule,
    SliderModule,
    CategoriesModule,
    ProductsModule,
    LikesModule,
    ReviewsModule,
    PromoModule,
    CartModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}