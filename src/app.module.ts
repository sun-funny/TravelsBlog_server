import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './controllers/users/users.module'; 
import { MongooseModule } from '@nestjs/mongoose';
import { TravelsModule } from './controllers/travels/travels.module';
import { CountryModule } from "./controllers/country/country.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './controllers/comments/comments.module';
import { Comment } from './controllers/comments/comment.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/travels'),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/travels',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    UsersModule,
    TravelsModule,
    CountryModule,
    CommentsModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets/uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}