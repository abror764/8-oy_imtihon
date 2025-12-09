import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private itemRepo: Repository<CartItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private productsService: ProductsService,
  ) { }

  async getCartForUser(userId: number) {
    let cart = await this.cartRepo.findOne({ where: { userId } });
    if (!cart) {
      cart = this.cartRepo.create({ userId, items: [] });
      await this.cartRepo.save(cart);
    }
    return cart;
  }

  async addToCart(userId: number, payload: { productId: number; variantId?: number; quantity: number }) {
    const cart = await this.getCartForUser(userId);
 
    const product = await this.productsService.findById(payload.productId);
    if (!product) throw new NotFoundException('Product not found');

    let price = product.price;
    if (payload.variantId) {
      const variant = product.variants?.find((v) => v.id === payload.variantId);
      if (!variant) throw new NotFoundException('Variant not found');
      price = Number(variant.price);
    }
    const existing = cart.items.find((i) => i.productId === payload.productId && i.variantId === payload.variantId);
    if (existing) {
      existing.quantity += payload.quantity;
      await this.itemRepo.save(existing);
    } else {
      const item = this.itemRepo.create({
        cart,
        productId: payload.productId,
        variantId: payload.variantId,
        quantity: payload.quantity,
        price,
      });
      await this.itemRepo.save(item);
      cart.items.push(item);
    }
    await this.cartRepo.save(cart);
    return this.getCartForUser(userId);
  }

  async buyNow(userId: number, payload: { productId: number; variantId?: number; quantity: number; address: string; paymentMethod: string }) {

    const product = await this.productsService.findById(payload.productId);
    if (!product) throw new NotFoundException('Product not found');

    let price = product.price;
    if (payload.variantId) {
      const variant = product.variants?.find((v) => v.id === payload.variantId);
      if (!variant) throw new NotFoundException('Variant not found');
      price = Number(variant.price);
    }

    const order = this.orderRepo.create({
      userId,
      items: [
        this.orderItemRepo.create({
          productId: payload.productId,
          variantId: payload.variantId,
          quantity: payload.quantity,
          price,
        }),
      ],
      totalItems: payload.quantity,
      totalPrice: price * payload.quantity,
      address: payload.address,
      paymentMethod: payload.paymentMethod,
      status: 'pending',
    } as any);
    await this.orderRepo.save(order);
    return order;
  }

  async officialPurchase(orderId: number) {

    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    for (const item of order.items) {
      const product = await this.productsService.findById(item.productId);
      if (!product) throw new NotFoundException('Product not found');
      if (item.variantId) {
        const variant = product.variants.find((v) => v.id === item.variantId);
        if (!variant) throw new NotFoundException('Variant not found');
        if (variant.stock < item.quantity) throw new BadRequestException('Insufficient variant stock');
        variant.stock -= item.quantity;
        await this.productsService.update(product.id, { variants: product.variants });
      } else {
        if (product.stock < item.quantity) throw new BadRequestException('Insufficient product stock');
        await this.productsService.update(product.id, { stock: product.stock - item.quantity });
      }
    }
    order.status = 'completed';
    await this.orderRepo.save(order);
    return order;
  }

  async checkoutCart(userId: number, payload: { address: string; paymentMethod: string; promoCode?: string }) {
    const cart = await this.getCartForUser(userId);
    if (!cart || !cart.items.length) throw new BadRequestException('Cart is empty');
    let totalPrice = 0;
    let totalItems = 0;
    const items: OrderItem[] = [];
    for (const i of cart.items) {
      items.push(
        this.orderItemRepo.create({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
          price: i.price,
        }),
      );
      totalPrice += Number(i.price) * i.quantity;
      totalItems += i.quantity;
    }
    const order = this.orderRepo.create({
      userId,
      items,
      totalPrice,
      totalItems,
      address: payload.address,
      paymentMethod: payload.paymentMethod,
      status: 'pending',
    } as any);
    await this.orderRepo.save(order);

    await this.itemRepo.delete({ cart: { id: cart.id } } as any);
    await this.cartRepo.delete(cart.id);
    return order;
  }
}