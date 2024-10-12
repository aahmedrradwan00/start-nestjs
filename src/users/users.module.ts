import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from '../common/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
