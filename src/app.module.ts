import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

<<<<<<< HEAD

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
=======
@Module({
    imports: [UsersModule],
    controllers: [AppController, UsersController],
    providers: [AppService, UsersService],
>>>>>>> e9dcf66 (services)
})
export class AppModule {}
