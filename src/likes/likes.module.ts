import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './like.schema';
import { Counter, CounterSchema } from './counter.schema';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}