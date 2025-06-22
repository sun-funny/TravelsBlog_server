import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
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

   @Put(':id')
  async updateTravel(@Param('id') id: string, @Body() travelDto: TravelDto) {
    return this.travelsService.updateTravel(id, travelDto);
  }

  @Delete(':id')
  async deleteTravel(@Param('id') id: string) {
    return this.travelsService.deleteTravel(id);
  }

  @Delete()
  async deleteAllTravels() {
    return this.travelsService.deleteAllTravels();
  }

}