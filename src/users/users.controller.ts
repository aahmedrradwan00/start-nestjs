import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
@Controller('users')
export class UsersController {
    private users: UserEntity[] = [];

    @Get()
    findAllUser(@Query('name', CustomValidationPipe) name: string): UserEntity[] {
        console.log(name);
        return this.users;
    }

    @Get(':name')
    findOne(@Param('name', ParseIntPipe) namee: string): string {
        return namee;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() userData: CreateUserDto, @Req() req: Request) {
        const newUser: UserEntity = {
            ...userData,
            id: uuid(),
        };
        this.users.push(newUser);
        return newUser;
    }

    @Patch(':name')
    update(@Req() req: Request, @Param('name') name: string, @Body() userData: CreateUserDto): any {
        console.log(name);
        console.log(req.params.name);
        return userData;
    }
    @Delete(':name')
    remove(@Param() name: string): string {
        return name;
    }
}
