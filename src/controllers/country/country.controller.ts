import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { PointService } from 'src/services/country/country.service';
import { PointDto } from 'src/dto/point-dto';

@Controller('points')
export class PointsController {
  constructor(private pointService: PointService) {}

  @Post()
  async createPoint(@Body() pointDto: PointDto) {
    return this.pointService.createCountry(pointDto);
  }

  @Get(':countryId')
  async getPointsByCountry(@Param('countryId') countryId: string) {
    return this.pointService.getPointsByCountry(countryId);
  }

   @Put(':id')
  async updateCountry(@Param('id') id: string, @Body() pointDto: PointDto) {
    return this.pointService.updateCountry(id, pointDto);
  }

  @Delete(':id')
  async deleteCountry(@Param('id') id: string) {
    return this.pointService.deleteCountry(id);
  }

  @Delete()
  async deleteAllCountry() {
    return this.pointService.deleteAllCountries();
  }

  @Get()
  async getAllPoints() {
    return this.pointService.getAllCountries();
  }

}