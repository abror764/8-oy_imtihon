import { Body, Controller, Get, Param, Post, Query, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get()
  list(@Query() q: any) {
    return this.svc.paginateAndFilter(q);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.svc.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.delete(+id);
  }
}