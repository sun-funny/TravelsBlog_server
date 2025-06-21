import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService,
              private authService: AuthService
              ) 
  {
    super({ usernameField: 'login', 
            passwordField: 'psw' });
  }

  async validate(login: string, psw: string): Promise<any> {
        const user = await this.authService.validate(login, psw);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}