import { UsersController } from "./users.controller";
import { UsersService } from "src/services/users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/shemas/user";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/static/constants";
import { LocalStrategy } from "src/services/Authentication/auth/local.strategy";
import { AuthService } from "src/services/Authentication/auth/auth.service";
import { JwtStrategyService } from "src/services/Authentication/jwt-strategy/jwt-strategy.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategyService, LocalStrategy],
  exports: [UsersService]
})
export class UsersModule {}