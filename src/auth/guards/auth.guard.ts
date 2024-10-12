import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private usersService:UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException('Token not found');
        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET});
        if (!payload) throw new UnauthorizedException('Invalid token');
        const user = await this.usersService.findUserById(payload.sub);
        if (!user) throw new UnauthorizedException('User not found');
        request['user'] = payload;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
