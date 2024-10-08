import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: [true, 'Name is required'], trim: true })
    name: string;

    @Prop({ required: [true, 'Email is required'], unique: true, match: [/^\S+@\S+\.\S+$/, 'Email is not valid'] })
    email: string;

    @Prop({ required: [true, 'Password is required'], minlength: [6, 'Password must be at least 6 characters long'] })
    password: string;

    // @Prop()
    // image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
