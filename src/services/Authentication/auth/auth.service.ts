import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { UserDto } from 'src/dto/user-dto';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Strategy } from 'passport-local';
import { response } from 'express';

@Injectable()
export class AuthService extends PassportStrategy(Strategy){
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    super({
        usernameField: 'login', 
        passwordField: 'psw',
        passReqToCallback: false
    })
  }

  async validate(login: string, psw: string): Promise<any> {
        const user = await this.usersService.findByLogin(login);
        console.log('user', user);

    if (!user) {
        	throw new HttpException(
            { message: 'Пользователь не найден в базе', statusCode: 404 },
            HttpStatus.NOT_FOUND
        );
    
    }

    if (user.psw !== psw) {
      throw new UnauthorizedException('Пароль неверный');
    }        
    
    return user;
    }

    
    async login(user: any) {
    const payload = { 
      login: user.login, 
      sub: user._id
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}

/*
  async validateUser(login: string, pass: string): Promise<any> {
        const user = await this.usersService.findByLogin(login);
        if (user && user.psw === pass) {
            const { psw, ...result } = user;
            return result;
        }
        return null;
    }

        async login(user: any) {
        const payload = { login: user.login, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
*/
