import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
// import { APP_FILTER } from '@nestjs/core';
// import { AllExceptionsFilter } from './common/http-exception.filter';

@Module({
    imports: [UsersModule],
    controllers: [AppController, UsersController],
    providers: [
        AppService,
        UsersService,
        // {
        //     provide: APP_FILTER,
        //     useClass: AllExceptionsFilter,
        // },
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
