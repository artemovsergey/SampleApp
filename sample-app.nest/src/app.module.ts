import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { UserMemoryRepository } from './repositories/usermemory.repository';
import { USER_REPOSITORY } from './interfaces/user.repository.';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: USER_REPOSITORY, // Используем строковый токен
      useClass: UserMemoryRepository, // Указываем реализацию
    },
  ],
})
export class AppModule {}
