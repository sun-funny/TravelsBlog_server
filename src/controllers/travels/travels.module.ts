import { TravelsService } from "src/services/travels/travels.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/static/constants"; 
import { JwtStrategyService } from "src/services/Authentication/jwt-strategy/jwt-strategy.service";
import { TravelsController } from "./travels.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Travel, TravelSchema } from "src/shemas/travel";

@Module({
  controllers: [TravelsController],
  imports: [MongooseModule.forFeature([
                {name: Travel.name, 
                schema: TravelSchema }]),
            PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret
            },)],
           
  providers: [TravelsService, JwtStrategyService],
})
export class TravelsModule {}