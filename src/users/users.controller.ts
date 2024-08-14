import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Partial<CreateUserDto>) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  findOne(@Param() id: number) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  update(@Param() id: number, @Body() updateUserDto: Partial<CreateUserDto>) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  remove(@Param() id: number) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
