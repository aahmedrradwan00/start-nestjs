import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { error } from 'console';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage =
            (typeof (exception instanceof HttpException ? exception.getResponse() : exception) === 'string' ? exception : (exception as { message?: string })?.message) || 'An error occurred';
        const responseBody = {
            statusCode: httpStatus,
            message: errorMessage,
            error,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
// import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';

// @Catch()
// export class AllExceptionsFilter extends BaseExceptionFilter {
//     catch(exception: unknown, host: ArgumentsHost) {
//         super.catch(exception, host);
//     }
// }

// import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const request = ctx.getRequest<Request>();
//         const status = exception.getStatus();
//         const environment = process.env.NODE_ENV || 'production';

//         response.status(status).json({
//             statusCode: status,
//             message: exception.message,
//             timestamp: new Date().toISOString(),
//             path: request.url,
//             // stack: environment === 'development' ? exception.stack : 'protected',
//         });
//     }
// }
