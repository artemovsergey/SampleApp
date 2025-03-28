// import { User } from "src/models/user.entity";
import { User } from '@prisma/client';
export const USER_REPOSITORY = 'USER_REPOSITORY'; // Создаем строковый токен

export interface IUserRepository {
    getAll(): Promise<User[]>;
    create(user: Omit<User, 'id'>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
  }