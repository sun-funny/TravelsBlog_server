import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Point, PointDocument } from 'src/shemas/point';
import { PointDto } from 'src/dto/point-dto';

@Injectable()
export class PointService {
  constructor(@InjectModel(Point.name) private pointModel: Model<PointDocument>) {}

  async getAllCountries(): Promise<Point[]> {
    return this.pointModel.find().exec();
  }

  async createCountry(pointDto: PointDto): Promise<Point> {
    const createdCountry = new this.pointModel({
      ...pointDto,
      id: new Types.ObjectId().toString()
    });
  return createdCountry.save();
  }

  async updateCountry(id: string, pointDto: PointDto): Promise<Point | null> {
    return this.pointModel.findByIdAndUpdate(id, pointDto, { new: true }).exec();
  }

  async deleteCountry(id: string): Promise<any> {
  try {
    return await this.pointModel.deleteOne({ id: id }).exec();
  } catch (error) {
    throw error;
  }
}

  async deleteCountries(): Promise<any> {
    return this.pointModel.deleteMany({});
  }

  async deleteAllCountries(): Promise<any> {
  return this.pointModel.deleteMany({}).exec();
  }

  async getPointsByCountry(countryId: string): Promise<Point[]> {
    return this.pointModel.find({ id_country: countryId }).exec();
  }
}