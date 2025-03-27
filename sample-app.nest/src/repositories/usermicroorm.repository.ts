// src/repositories/user.micro-orm.repository.ts
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, EntityManager, wrap, Loaded } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IUserRepository } from 'src/interfaces/user.repository.';
import { User } from 'src/models/user.entity';
import { Post } from 'src/models/post.entity';


@Injectable()
export class UserMicroOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async getAll(): Promise<Loaded<User, 'posts'>[]> {
    try {
      return await this.userRepository.findAll({
        populate: ['posts'], // Загружаем связанные посты
      });
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    try {
      const user = this.userRepository.create(userData);
      await this.em.persistAndFlush(user);
      return user;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async findAll(): Promise<Loaded<User, 'posts'>[]> {
    return this.getAll(); // Просто вызываем getAll
  }

  async findOne(id: number): Promise<Loaded<User, 'posts'>> {
    try {
      const user = await this.userRepository.findOne(
        { id },
        { populate: ['posts'] } // Загружаем посты пользователя
      );

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async update(id: number, userData: { name?: string; age?: number }): Promise<User> {
    try {
      const user = await this.findOne(id); // Проверяем существование пользователя
      wrap(user).assign(userData);
      await this.em.flush();
      return user;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const user = await this.findOne(id);
      
      // Удаляем все посты пользователя
      await this.em.nativeDelete(Post, { author: user });
      
      // Удаляем самого пользователя
      await this.em.removeAndFlush(user);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  private handleDatabaseError(error: any): never {
    if (error.code === '23505') { // Код ошибки уникального ограничения в PostgreSQL
      throw new ConflictException('Unique constraint violation');
    } else if (error.name === 'NotFoundError') {
      throw new NotFoundException('Record not found');
    } else {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}