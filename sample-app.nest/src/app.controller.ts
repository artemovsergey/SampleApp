import { Controller, Get } from '@nestjs/common';

import { User } from './models/user';
import { UsersService } from './services/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Get('users1')
  getUsers(id1: number): User[] {
    return this.userService.findAll()
  }
  
}
