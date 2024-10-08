import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { v4 as uuid } from 'uuid';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Connection, Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    // Find all users
    async findUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    // Find a user by ID
    async findUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    // Create a new user
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = await this.userModel.create(createUserDto);
        return newUser;
    }


    // Update an existing user
    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return updatedUser;
    }

    // Delete a user by ID
    async deleteUser(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}

//     private users: UserEntity[] = [];

//     findUsers(): UserEntity[] {
//     return this.users;
// }

// findUserById(id: string): UserEntity {
//     return this.users.find((user) => user.id === id);
// }

// createUser(createUserDto: CreateUserDto): UserEntity {
//     const newUser: UserEntity = {
//         ...createUserDto,
//         id: uuid(),
//     };
//     this.users.push(newUser);
//     return newUser;
// }

// updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
//     const index = this.users.findIndex((user) => user.id === id);
//     this.users[index] = { ...this.users[index], ...updateUserDto };
//     return this.users[index];
// }

// deleteUser(id: string): void {
//     this.users = this.users.filter((user) => user.id !== id);
// }
