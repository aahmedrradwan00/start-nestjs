import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60d' },
        }),
    ],
    providers: [AuthService, UsersService],
    controllers: [AuthController],
})
export class AuthModule {}
