import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SliderService } from './slider.service';

@ApiTags('slider')
@Controller('slider')
export class SliderController {
  constructor(private svc: SliderService) {}

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get()
  list() {
    return this.svc.findAll();
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
    return this.svc.remove(+id);
  }
}