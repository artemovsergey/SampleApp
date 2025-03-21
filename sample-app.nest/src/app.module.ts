import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService]
})
export class AppModule {}
