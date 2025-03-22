import { UpdateUserDto } from "src/dto/update-user.dto";
import { User } from "src/models/user.entity";

export const USER_REPOSITORY = 'USER_REPOSITORY'; // Создаем строковый токен

export interface IUserRepository{
    create(user: User): User;
    findOne(arg0: number): unknown;
    update(arg0: number, updateUserDto: UpdateUserDto): unknown;
    remove(arg0: number): unknown;
    findAll(): User[]
}