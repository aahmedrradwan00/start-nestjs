import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    Req,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { User } from './schema/user.schema';
import { UserInterface } from './interface/user.interface';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { log } from 'console';

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
    @Post('')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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
