import { Body, Controller, Get, Post, Put, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TravelsService } from 'src/services/travels/travels.service';
import { TravelDto } from 'src/dto/travel-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './assets/upload_country',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `/upload_country/${file.filename}` };
  }
}