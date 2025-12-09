import { Body, Controller, Get, Post, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private svc: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  leave(@Request() req: any, @Body() body: { productId: number; name: string; stars: number; comment: string; profileImage?: string }) {
    return this.svc.leaveReview(req.user.id, body.productId, {
      name: body.name,
      stars: body.stars,
      comment: body.comment,
      profileImage: body.profileImage,
    });
  }

  @Get()
  list(@Query('productId') productId: string) {
    return this.svc.forProduct(+productId);
  }
}