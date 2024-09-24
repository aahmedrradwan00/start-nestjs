import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    private users: UserEntity[] = [];

    @Get()
    findAllUser(@Query('name', CustomValidationPipe) name: string): UserEntity[] {
        return this.usersService.findUsers();
    }
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
        return this.usersService.findUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':name')
    update(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): any {
        console.log(id);
        return this.usersService.updateUser(id, updateUserDto);
    }
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}
