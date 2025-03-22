import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from 'src/interfaces/user.repository.';
import { User } from 'src/models/user.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: User }) // Указываем тип DTO
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() user: User) {
    return 'User created';
  }

  // @Get()
  // findAll() {
  //   return this.usersRepository.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const user = await this.usersRepository.findOne(+id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: User) {
  //   return this.usersRepository.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id') id: string) {
  //   return this.usersRepository.remove(+id);
  // }
}