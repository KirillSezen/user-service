import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterDto } from './dto/filter.dto';
import { FilterService } from './filter.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private filterService: FilterService,
  ) {}

  async findAll(filterDto: FilterDto) {
    const users = await this.filterService.filterUsers(filterDto);
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException(
        'User with such id doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async findMe(currentUserId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });
    if (!user) {
      throw new HttpException(
        'User with such id doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException(
        'User with such id doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return result;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException(
        'User with such id doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.prisma.user.delete({ where: { id } });
    return result;
  }
}
