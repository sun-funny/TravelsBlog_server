import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { TravelsService } from 'src/services/travels/travels.service';
import { TravelDto } from 'src/dto/travel-dto';

@Controller('travels')
export class TravelsController {
  constructor(private travelsService: TravelsService) {}

  @Post()
  async createTravel(@Body() travelDto: TravelDto) {
    try {
      const savedTravel = await this.travelsService.createTravel(travelDto);
      return savedTravel;
    } catch (error) {
      throw new HttpException('Ошибка при создании путешествия', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}