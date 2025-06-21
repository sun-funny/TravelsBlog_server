import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Get hi";
  }

  @Post()  
  sendAll(): string {
    return "sendAll";
  }

  @Put()  
  update(): string {
    return "Put hi";
  }

  @Delete()  
  delete(): string {
    return "Delete hi";
  }

}
