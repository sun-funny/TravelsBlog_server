import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/Authentication/auth/auth.service';
import { UserDto } from 'src/dto/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post(':login')
  async login(@Body() user: UserDto) {
    return this.authService.login(user);
  }
}
