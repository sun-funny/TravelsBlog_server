import { PointService } from "src/services/country/country.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/static/constants"; 
import { JwtStrategyService } from "src/services/Authentication/jwt-strategy/jwt-strategy.service";
import { PointsController } from "./country.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Point, PointSchema } from "src/shemas/point";

@Module({
  controllers: [PointsController],
  imports: [MongooseModule.forFeature([
                {name: Point.name, 
                 schema: PointSchema }]),
            PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret
            },)],
           
  providers: [ PointService, JwtStrategyService],
})
export class CountryModule {}