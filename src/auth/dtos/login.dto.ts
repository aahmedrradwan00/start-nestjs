import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
    @IsNotEmpty({ message: 'Email must be entered' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    @Length(3, 20)
    @IsNotEmpty({ message: 'Password must be entered' })
    password: string;
}
