import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.CONNECTION_URL),
        DatabaseModule,
        AuthModule,
        UsersModule,
        MulterModule.register({
            storage: diskStorage({
                destination: './upload',
                filename: (req, file, cb) => cb(null, `${Date.now()}-{file.originalname}`),
            }),
        }),
    ],

    controllers: [AppController, UsersController, AuthController],
    providers: [
        AppService,
        UsersService,
        AuthService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            // .forRoutes('users');
            // .forRoutes(UsersController);
            // .forRoutes({ path: 'users', method: RequestMethod.GET }, { path: 'users/:id', method: RequestMethod.GET });
            .forRoutes({ path: '*', method: RequestMethod.GET });
    }
}
