import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { IUserRepository } from 'src/interfaces/user.repository.';

import { User } from 'src/models/user.entity';

@Injectable()
export class UsersService {
  
  getAll(): User[] {
    throw new Error('Method not implemented.');
  }
  
  create(user: User) {
    return user;
  }

  findAll() : User[] {
    return []
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
