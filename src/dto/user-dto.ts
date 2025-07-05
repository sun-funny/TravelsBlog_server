import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty() login: string;
    @IsNotEmpty() psw: string;
    @IsNotEmpty() email: string;
}