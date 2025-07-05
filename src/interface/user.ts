export type Roles = 'admin' | 'user';
import * as mongoose from "mongoose";
export interface IUser {
    psw: string,
    login: string,
    role?: Roles,
    _id?: mongoose.Types.ObjectId;
}
export interface IResponseUser {
    id: string,
    access_token: string,
    refresh_token: string;
    role: Roles
}