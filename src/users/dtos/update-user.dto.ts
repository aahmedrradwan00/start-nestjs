<<<<<<< HEAD
import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto"
=======
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
>>>>>>> e9dcf66 (services)
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export class  {
//     name?: string;
//     email?: string;
//     age?: number;
//     password?: string;
// }
