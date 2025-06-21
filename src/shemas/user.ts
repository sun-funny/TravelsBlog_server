import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interface/user';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ required: true, unique: true })
  login: string;
  @Prop({ required: true })
  psw: string;
  @Prop()
  cardNumber: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  name: string;
  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);