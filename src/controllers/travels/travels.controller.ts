import { Body, Controller, Get, Post } from '@nestjs/common';
import { TravelsService } from 'src/services/travels/travels.service';
import { TravelDto } from 'src/dto/travel-dto';

@Controller('travels')
export class TravelsController {
  constructor(private travelsService: TravelsService) {}

  @Get()
  async getTravels() {
    return this.travelsService.getAllTravels();
  }

  @Post()
  async createTravel(@Body() travelDto: TravelDto) {
    return this.travelsService.createTravel(travelDto);
  }
}