import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory: (errors) =>
                new BadRequestException({
                    message: errors.map((err) => `${Object.values(err.constraints).join(', ')}`).join(', '),
                }),
        }),
    );

    // app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(3000);
}
bootstrap();
