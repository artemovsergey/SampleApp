import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/interfaces/user.repository.';

import { User } from 'src/models/user.entity';

@Injectable()
export class UserMemoryRepository {
  
  users: User[] = [];

  getAll(): User[] {
    console.log(this.users)
    return this.users;
  }

  create(user: User) {
    this.users.push(user);
    console.log(user)
    return user;
  }

  findAll(): User[] {
    return [];
  }

  findOne(id: number): User {
    var user = this.users.find((u) => u.id == id);
    if (user != null) {
      return user;
    } else {
      throw new NotFoundException('Нет такого пользователя!');
    }
  }

  update(id: number, user: User) {
    var u = this.findOne(id)
    const obj =  { ...u, ...user}
    return obj
  }

  remove(id: number) {
    var user = this.findOne(id)
    this.users = this.users.filter(u => u.id != id)
  }
}
