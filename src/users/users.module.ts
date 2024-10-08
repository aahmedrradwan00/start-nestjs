import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
