import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {IUser, Roles} from '../interface/user';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Types.ObjectId;
    @Prop({ required: true }) psw: string;
    @Prop({ required: true, unique: true }) login: string;
    @Prop({ default: 'user' }) role: Roles;  
    @Prop() email: string;
    @Prop() access_token?: string;
    @Prop() refresh_token?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);