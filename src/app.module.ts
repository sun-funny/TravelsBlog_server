import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './controllers/users/users.module'; 
import { MongooseModule } from '@nestjs/mongoose';
import { TravelsModule } from './controllers/travels/travels.module';
import {AuthModule} from "./controllers/auth/auth.module";
import { CountryModule } from "./controllers/country/country.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TravelsModule,
    CountryModule,
    MongooseModule.forRoot('mongodb://localhost:27017/travels')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}