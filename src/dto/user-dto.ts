import { IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    login: string;
    
    @IsNotEmpty()
    psw: string;
    
    @IsNotEmpty()
    cardNumber: string;
    
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    age: number;

}