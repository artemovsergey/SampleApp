import { Controller, Get, Inject } from '@nestjs/common';

import { IUserRepository, USER_REPOSITORY } from './interfaces/user.repository.';

@Controller()
export class AppController {
  constructor(
    @Inject(USER_REPOSITORY) // Внедряем по токену
     private readonly userMemoryRespository: IUserRepository
  ) {}

  // @Get('users1')
  // getUsers(id1: number): User[] {
  //   return this.userMemoryRespository.findAll()
  // }
  
}
