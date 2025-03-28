import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from 'src/interfaces/user.repository.';
import { User } from '@prisma/client';  // Используем Prisma-тип
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User as UserEntity } from 'src/models/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserEntity })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() user: User): Promise<User> {
    return await this.usersRepository.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersRepository.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: User): Promise<User> {
    return await this.usersRepository.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersRepository.remove(+id);
  }
}