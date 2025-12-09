import { Controller, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  all() {
    return this.usersService.all();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(+id, body);
  }
}