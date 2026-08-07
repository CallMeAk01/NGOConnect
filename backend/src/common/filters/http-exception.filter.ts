import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message =
                typeof exceptionResponse === 'string'
                    ? exceptionResponse
                    : (exceptionResponse as any).message || exceptionResponse;
        } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle Prisma errors (e.g., unique constraint violations, foreign key errors, not found)
            switch (exception.code) {
                case 'P2002':
                    status = HttpStatus.CONFLICT;
                    message = `Unique constraint failed on field(s): ${exception.meta?.target}`;
                    break;
                case 'P2025':
                    status = HttpStatus.NOT_FOUND;
                    message = 'Record to update/delete not found.';
                    break;
                case 'P2003':
                    status = HttpStatus.BAD_REQUEST;
                    message = `Foreign key constraint failed on field: ${exception.meta?.field_name}`;
                    break;
                default:
                    status = HttpStatus.BAD_REQUEST;
                    message = `Database Error: ${exception.message}`;
                    break;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}
