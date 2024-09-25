import { PartialType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto extends PartialType(PaginationDto) {
  @ApiProperty({
    description: 'this is search string',
    example: 'user1',
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  search?: string;

  @ApiProperty({
    description: 'field for sorting',
    example: 'name',
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  sort?: string;

  @ApiProperty({
    description: 'sort order',
    example: 'asc',
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  order?: string;
}
