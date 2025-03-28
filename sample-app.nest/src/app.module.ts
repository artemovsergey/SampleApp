import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { USER_REPOSITORY } from './interfaces/user.repository.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { PrismaService } from './services/prisma.service';
import { UserPrismaRepository } from './repositories/userprisma.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './models/post.entity';

@Module({
  imports: [
  ],
  controllers: [AppController, UsersController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
      scope: Scope.DEFAULT, // по умолчанию singleton
    },
    {
      provide: PrismaService,
      useClass: PrismaService,
      scope: Scope.DEFAULT, // по умолчанию singleton
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
})
export class AppModule {}
