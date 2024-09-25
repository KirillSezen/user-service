import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { FilterDto } from './dto/filter.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './decorators/user.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filterDto: FilterDto) {
    return this.usersService.findAll(filterDto);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@User() user) {
    const currentUserId = user.id;
    return this.usersService.findMe(currentUserId);
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit user' })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
