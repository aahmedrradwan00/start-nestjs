import { Module } from '@nestjs/common';
<<<<<<< HEAD

@Module({})
=======
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
>>>>>>> e9dcf66 (services)
export class UsersModule {}
