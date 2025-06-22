import { Body, Controller, Get, Post, Put, Delete, Param, UseInterceptors, UploadedFiles} from '@nestjs/common';
import { PointService } from 'src/services/country/country.service';
import { PointDto } from 'src/dto/point-dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './assets/uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const fileUrls = files.map(file => {
      return `assets/uploads/${file.filename}`;
    });
    return { urls: fileUrls };
  }

}