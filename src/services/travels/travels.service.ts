import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Travel, TravelDocument } from 'src/shemas/travel';
import { TravelDto } from 'src/dto/travel-dto';

@Injectable()
export class TravelsService {
  constructor(@InjectModel(Travel.name) private travelModel: Model<TravelDocument>) {}

  async getAllTravels(): Promise<Travel[]> {
    return this.travelModel.find().exec();
  }

  async createTravel(travelDto: TravelDto): Promise<Travel> {
    const createdTravel = new this.travelModel(travelDto);
    return createdTravel.save();
  }

  async updateTravel(id: string, travelDto: TravelDto): Promise<Travel | null> {
    return this.travelModel.findByIdAndUpdate(id, travelDto, { new: true }).exec();
  }

  async deleteTravel(id: string): Promise<any> {
  try {
    return await this.travelModel.deleteOne({ id: id }).exec();
  } catch (error) {
    throw error;
  }
}

  async deleteTravels(): Promise<any> {
    return this.travelModel.deleteMany({});
  }

  async deleteAllTravels(): Promise<any> {
  return this.travelModel.deleteMany({}).exec();
  }
}