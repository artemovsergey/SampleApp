import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { UserMemoryRepository } from './repositories/usermemory.repository';
import { USER_REPOSITORY } from './interfaces/user.repository.';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
      scope: Scope.DEFAULT, // по умолчанию singleton
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserMemoryRepository,
    },
  ],
})
export class AppModule {}
