import { User } from "src/models/user";

export interface IUserRepository{
    getall(): User[]
}