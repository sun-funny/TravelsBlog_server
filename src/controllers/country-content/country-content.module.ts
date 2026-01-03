import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/constants';
import { JwtStrategyService } from 'src/services/Authentication/jwt-strategy/jwt-strategy.service';
import { CountryContentController } from './country-content.controller';
import { CountryContentService } from 'src/services/country-content/country-content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryContent, CountryContentSchema  } from 'src/shemas/country-content';

@Module({
  controllers: [CountryContentController],
  imports: [
    MongooseModule.forFeature([
      {
        name: CountryContent.name,
        schema: CountryContentSchema
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  providers: [CountryContentService, JwtStrategyService],
  exports: [CountryContentService]
})
export class CountryContentModule {}