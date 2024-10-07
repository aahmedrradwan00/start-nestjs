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
    UseInterceptors,
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

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @UseInterceptors(new LoggingInterceptor())
    findAllUser(@Query('name', CustomValidationPipe) name: string): UserEntity[] {
        return this.usersService.findUsers();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string): UserEntity {
        const user = this.usersService.findUserById(id);
        if (!user) throw new NotFoundException();
        return user;
    }

    @Post()
    // @Roles(['admin'])
    @HttpCode(HttpStatus.CREATED)
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
    }
}
