import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private svc: CategoriesService) {}

  @Get()
  list() {
    return this.svc.all();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.findById(+id);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.svc.create(name);
  }
}