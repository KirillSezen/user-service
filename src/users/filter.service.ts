import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FilterDto } from '../users/dto/filter.dto';

@Injectable()
export class FilterService {
  constructor(private prisma: PrismaService) {}

  async filterBooks(filterDto: FilterDto) {
    const { page, limit, search, sort, order } = filterDto;
    const offset = (page - 1) * limit || 0;

    const whereConditions = {};
    if (search) {
      whereConditions['OR'] = [
        { name: { contains: search, mode: 'insensitive' } },
        { genre: { contains: search, mode: 'insensitive' } },
      ];
    }

    const orderByConditions = {};
    if (sort && order) {
      orderByConditions[sort] = order;
    }

    const posts = await this.prisma.book.findMany({
      where: whereConditions,
      orderBy: orderByConditions,
      skip: offset,
      take: limit,
    });

    return posts;
  }

  async filterUsers(filterDto: FilterDto) {
    const { page, limit, search, sort, order } = filterDto;
    const offset = (page - 1) * limit || 0;

    const whereConditions = {};
    if (search) {
      whereConditions['OR'] = [
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const orderByConditions = {};
    if (sort && order) {
      orderByConditions[sort] = order;
    }

    const users = await this.prisma.user.findMany({
      where: whereConditions,
      orderBy: orderByConditions,
      skip: offset,
      take: limit,
    });

    return users;
  }
}
