import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryName?: string;
}