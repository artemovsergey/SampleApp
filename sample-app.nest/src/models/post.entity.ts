import { User } from './user.entity';

export class Post {
  id!: number;
  title!: string;
  content!: string;
  author!: User;
}