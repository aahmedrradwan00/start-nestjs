import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(3, 20)
    // @Length(3, 20, { groups: ['create'] })
    // @Length(5, 20, { groups: ['update'] })
    name: string;

    @IsNotEmpty({ message: 'Email must be entered' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsOptional()
    @IsNumber()
    age?: number;

    @IsString()
    @Length(3, 20)
    @IsNotEmpty({ message: 'Password must be entered' })
    password: string;

    @IsOptional()
    @IsString()
    image?: string;
}
