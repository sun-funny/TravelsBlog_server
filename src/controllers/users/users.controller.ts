import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import { User } from 'src/shemas/user';
import {UserDto} from "../../dto/user-dto";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../../services/Authentication/jwt-auth.guard/jwt-auth.guard.service";
import { ValidationParamIdPipe } from 'src/pipes/param-id.pipe';
import { UserAuthPipe } from 'src/pipes/user-auth.pipe';
import { IUser } from 'src/interface/user';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}


    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }


    @Get(":id")
    async getUserById(@Param('id', ValidationParamIdPipe) id: string): Promise<User> {
        console.log('Searching for user with ID:', id);
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        console.log('Found user:', user);
        return user;
    }


    @Post()
    registerUser(@Body(UserAuthPipe) data: UserDto): Promise<boolean> {
        return this.userService.checkRegUser(data.login).then((queryRes) => {
            if (queryRes.length === 0) {
                return this.userService.registerUser(data);
            } else {
                console.log('err - user exists')
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже зарегистрирован',
                }, HttpStatus.CONFLICT)
            }
        });

    }
    @UseGuards(AuthGuard('local'))
    @Post(":login")
    authUser(@Body(UserAuthPipe) data: UserDto, @Param('login') login): any  {
        return this.userService.login(data);
    }

    @Put(":id")
    updateUsers(@Param('id') id, @Body() data) : Promise<User | null> {
        return this.userService.updateUsers(id, data);
    }

    @Delete()
    deleteUsers(): Promise<any> {
        return this.userService.deleteUsers();
    }


    @Delete(":id")
    deleteUserById(@Param('id') id): Promise<User | null> {
        return this.userService.deleteUserById(id);
    }

    @Post('refresh')
        async refresh(@Body() body: { refresh_token: string }) {
        return this.userService.refreshToken(body.refresh_token);
    }

}