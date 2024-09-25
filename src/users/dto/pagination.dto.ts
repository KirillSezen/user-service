import { IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: 'this is current page',
    example: 1,
  })
  @IsInt({ message: 'Must be int' })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'this is object per page limit',
    example: 3,
  })
  @IsInt({ message: 'Must be int' })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}
