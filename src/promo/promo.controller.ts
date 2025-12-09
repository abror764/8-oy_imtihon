import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PromoService } from './promo.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UseGuards as UseNestGuard } from '@nestjs/common';

@ApiTags('promo')
@Controller('promo')
export class PromoController {
  constructor(private svc: PromoService) {}

  @UseNestGuard(JwtAuthGuard)
  @UseNestGuard(RolesGuard)
  @Roles('admin')
  @Post('create')
  async create(@Body() body: { code: string; percent: number; productIds: number[]; expiresAt?: string }) {
    const products = body.productIds.map((id) => ({ id } as any));
    return this.svc.create(body.code, body.percent, products as any, body.expiresAt ? new Date(body.expiresAt) : undefined);
  }

  @UseNestGuard(JwtAuthGuard)
  @Post('apply')
  async apply(@Request() req: any, @Body() body: { code: string; productIds: number[] }) {
    return this.svc.apply(body.code, req.user.id, body.productIds);
  }
}