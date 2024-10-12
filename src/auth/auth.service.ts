import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument } from '../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    async singIn(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userModel.findOne({ email });
        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user._id, email: user.email };
        const token = await this.jwtService.signAsync(payload);
        return { token, user };
    }
}
