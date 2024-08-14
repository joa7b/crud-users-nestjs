import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: Partial<CreateUserDto>) {
    try {
      const userDtoInstance = new CreateUserDto(createUserDto);
      await validateOrReject(userDtoInstance);
      const userInstance = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(userInstance);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.usersRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    try {
      const userDtoInstance = new UpdateUserDto(updateUserDto);
      await validateOrReject(userDtoInstance);
      await this.usersRepository.update(id, updateUserDto);
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete(id);
      return { deleted: true };
    } catch (error) {
      throw new Error(error);
    }
  }
}
