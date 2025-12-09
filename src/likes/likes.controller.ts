import { Body, Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private svc: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async toggle(@Request() req: any, @Body() body: { productId: number; liked: boolean }) {
    const userId = req.user.id;
    return this.svc.setLike(userId, body.productId, body.liked);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Request() req: any) {
    return this.svc.listForUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async status(@Request() req: any, @Query('productId') productId: string) {
    return this.svc.getLikeStatus(req.user.id, +productId);
  }
}