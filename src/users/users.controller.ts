<<<<<<< HEAD
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
=======
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
>>>>>>> e9dcf66 (services)
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UserEntity } from './user.entity';
<<<<<<< HEAD
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
=======
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAllUser(@Query('name', CustomValidationPipe) name: string): UserEntity[] {
        return this.usersService.findUsers();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
        return this.usersService.findUserById(id);
>>>>>>> e9dcf66 (services)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
<<<<<<< HEAD
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
=======
    createUser(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id')
    update(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): any {
        console.log(id);
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
>>>>>>> e9dcf66 (services)
    }
}
