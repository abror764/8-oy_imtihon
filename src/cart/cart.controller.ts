import { Body, Controller, Get, Post, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private svc: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Request() req: any) {
    return this.svc.getCartForUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  add(@Request() req: any, @Body() body: { productId: number; variantId?: number; quantity: number }) {
    return this.svc.addToCart(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('buy-now')
  buyNow(@Request() req: any, @Body() body: { productId: number; variantId?: number; quantity: number; address: string; paymentMethod: string }) {
    return this.svc.buyNow(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  checkout(@Request() req: any, @Body() body: { address: string; paymentMethod: string; promoCode?: string }) {
    return this.svc.checkoutCart(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('finalize/:orderId')
  finalize(@Param('orderId') orderId: string) {
    return this.svc.officialPurchase(+orderId);
  }
}