import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { User } from './schema/user.schema';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
    ) {}

    @Get()
    @UseInterceptors(new LoggingInterceptor())
    async findAllUser(@Query('name', CustomValidationPipe) name: string): Promise<User[]> {
        const name2 = this.configService.get<string>('NAME');
        console.log('Config Name:', name2);
        console.log('Process Environment Name:', process.env.NAME);

        // You might want to filter users by name if it's provided
        return this.usersService.findUsers();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findUserById(id);
    }

    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(AuthGuard)
    @Post('')
    // // @Roles(['admin'])
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        if (file) {
            console.log(file);
            createUserDto.image = file.originalname;
        }
        console.log(createUserDto);
        return await this.usersService.createUser(createUserDto);
    }

    @Patch(':id')
    update(@Req() req: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto): any {
        console.log(id);
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}
