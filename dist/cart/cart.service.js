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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./cart.entity");
const typeorm_2 = require("typeorm");
const cart_item_entity_1 = require("./cart-item.entity");
const order_entity_1 = require("./order.entity");
const order_item_entity_1 = require("./order-item.entity");
const products_service_1 = require("../products/products.service");
let CartService = class CartService {
    constructor(cartRepo, itemRepo, orderRepo, orderItemRepo, productsService) {
        this.cartRepo = cartRepo;
        this.itemRepo = itemRepo;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.productsService = productsService;
    }
    async getCartForUser(userId) {
        let cart = await this.cartRepo.findOne({ where: { userId } });
        if (!cart) {
            cart = this.cartRepo.create({ userId, items: [] });
            await this.cartRepo.save(cart);
        }
        return cart;
    }
    async addToCart(userId, payload) {
        var _a;
        const cart = await this.getCartForUser(userId);
        const product = await this.productsService.findById(payload.productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        let price = product.price;
        if (payload.variantId) {
            const variant = (_a = product.variants) === null || _a === void 0 ? void 0 : _a.find((v) => v.id === payload.variantId);
            if (!variant)
                throw new common_1.NotFoundException('Variant not found');
            price = Number(variant.price);
        }
        const existing = cart.items.find((i) => i.productId === payload.productId && i.variantId === payload.variantId);
        if (existing) {
            existing.quantity += payload.quantity;
            await this.itemRepo.save(existing);
        }
        else {
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
    async buyNow(userId, payload) {
        var _a;
        const product = await this.productsService.findById(payload.productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        let price = product.price;
        if (payload.variantId) {
            const variant = (_a = product.variants) === null || _a === void 0 ? void 0 : _a.find((v) => v.id === payload.variantId);
            if (!variant)
                throw new common_1.NotFoundException('Variant not found');
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
        });
        await this.orderRepo.save(order);
        return order;
    }
    async officialPurchase(orderId) {
        const order = await this.orderRepo.findOne({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        for (const item of order.items) {
            const product = await this.productsService.findById(item.productId);
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            if (item.variantId) {
                const variant = product.variants.find((v) => v.id === item.variantId);
                if (!variant)
                    throw new common_1.NotFoundException('Variant not found');
                if (variant.stock < item.quantity)
                    throw new common_1.BadRequestException('Insufficient variant stock');
                variant.stock -= item.quantity;
                await this.productsService.update(product.id, { variants: product.variants });
            }
            else {
                if (product.stock < item.quantity)
                    throw new common_1.BadRequestException('Insufficient product stock');
                await this.productsService.update(product.id, { stock: product.stock - item.quantity });
            }
        }
        order.status = 'completed';
        await this.orderRepo.save(order);
        return order;
    }
    async checkoutCart(userId, payload) {
        const cart = await this.getCartForUser(userId);
        if (!cart || !cart.items.length)
            throw new common_1.BadRequestException('Cart is empty');
        let totalPrice = 0;
        let totalItems = 0;
        const items = [];
        for (const i of cart.items) {
            items.push(this.orderItemRepo.create({
                productId: i.productId,
                variantId: i.variantId,
                quantity: i.quantity,
                price: i.price,
            }));
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
        });
        await this.orderRepo.save(order);
        await this.itemRepo.delete({ cart: { id: cart.id } });
        await this.cartRepo.delete(cart.id);
        return order;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService])
], CartService);
//# sourceMappingURL=cart.service.js.map