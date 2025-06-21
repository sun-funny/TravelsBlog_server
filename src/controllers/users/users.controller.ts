import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards, Request} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../shemas/user";
import {UserDto} from "../../dto/user-dto";
import RejectedValue = jest.RejectedValue;
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/Authentication/auth/auth.service';
 
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService,
                private authService: AuthService
    ) {
    }
 
    @Post()
    async createUser(@Body() data: UserDto): Promise<User> {

        const existingUser = await this.userService.checkRegUser(data.login);
        const existingEmail = await this.userService.findByEmail(data.email);
        if (existingUser.length > 0) {
        console.log('err - user уже существует');
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            errorText: 'Пользователь с таким логином уже зарегистрирован'
        }, HttpStatus.CONFLICT);
        }

        if (existingEmail) {
        console.log('err - email уже существует');
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            errorText: 'Пользователь с таким email уже зарегистрирован'
        }, HttpStatus.CONFLICT);
        }
    
    return this.userService.createUser(data);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
 
    @Get(":id")
    getUserById(@Param('id') id: string): Promise<User | null> {
        return this.userService.getUserById(id);
    }

    @UseGuards(AuthGuard('local'))

    @Post(':login')
    async login(@Request() req) {
        try {
            	return this.authService.login(req.user);
        } catch (error) {
        throw error;
    }
}
 
    @Put(":id")
    updateUsers(@Param('id') id: string, @Body() data: Partial<UserDto>): Promise<User | null> {
        return this.userService.updateUser(id, data);
    }
 
    @Delete()
    deleteAllUsers(): Promise<any> {
        return this.userService.deleteAllUsers();
    }
 
 
    @Delete(":id")
    deleteUserById(@Param('id') id: string): Promise<User | null> {
        return this.userService.deleteUserById(id);
    }
 
}

/*
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    
async validateUser(@Param('login') login: string): Promise<any> {
    const user = await this.userService.findByLogin(login);
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        errorText: 'Пользователь не найден в базе',
      }, HttpStatus.NOT_FOUND);
    }
    return user;
}*/