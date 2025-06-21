import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import {JwtModule, JwtService} from "@nestjs/jwt";
import { LocalStrategy } from "src/services/Authentication/auth/local.strategy";
import { AuthService } from "src/services/Authentication/auth/auth.service";
import {UsersService} from "../../services/users/users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../../shemas/user";
import {JwtStrategyService} from "../../services/Authentication/jwt-strategy/jwt-strategy.service";
import {AuthController} from "./auth.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UsersService, JwtStrategyService],
})
export class AuthModule {}