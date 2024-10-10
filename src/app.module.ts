import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/schema/user.schema';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { UsersModule } from './users/users.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.CONNECTION_URL), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [AppController, UsersController],
    providers: [
        AppService,
        UsersService,
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
