import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Travel, TravelDocument } from 'src/shemas/travel';
import { TravelDto } from 'src/dto/travel-dto';

@Injectable()
export class TravelsService {
  constructor(@InjectModel(Travel.name) private travelModel: Model<TravelDocument>) {}

    async createTravel(travelDto: TravelDto): Promise<Travel> {
        const createdTravel = new this.travelModel(travelDto);
        return createdTravel.save();
    }

    async deleteTravels(): Promise<any> {
        return this.travelModel.deleteMany({});
    }
}