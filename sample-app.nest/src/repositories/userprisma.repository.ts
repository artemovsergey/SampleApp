
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User, Post } from '@prisma/client';
import { IUserRepository } from 'src/interfaces/user.repository.';
import { PrismaService } from 'src/services/prisma.service';


@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        include: {
          posts: true, // Включаем связанные посты
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async create(userData: User): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name: userData.name,
          age: userData.age,
        },
      });
    } catch (error) {
      console.log(error)
      this.handlePrismaError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.getAll(); // Можно просто вызывать getAll
  }

  async findOne(id: number): Promise<User & { posts?: Post[] }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          posts: true, // Включаем посты пользователя
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, userData: { name?: string; age?: number }): Promise<User> {
    try {
      await this.findOne(id); // Проверяем существование пользователя

      return await this.prisma.user.update({
        where: { id },
        data: {
          name: userData.name,
          age: userData.age,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Удаляем сначала все посты пользователя
      await this.prisma.post.deleteMany({
        where: { authorId: id },
      });

      // Затем удаляем самого пользователя
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): never {
   
    switch (error.code) {
      case 'P2002':
        throw new ConflictException('Unique constraint violation');
      case 'P2025':
        throw new NotFoundException('Record not found');
      default:
        throw new InternalServerErrorException('Something went wrong');
    }
  }

}