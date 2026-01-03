import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryContent, CountryContentDocument } from 'src/shemas/country-content';
import { CountryContentDto } from 'src/dto/country-content-dto';
import { ICountryContent } from 'src/interface/country-content';

@Injectable()
export class CountryContentService {
  constructor(
    @InjectModel(CountryContent.name) 
    private countryContentModel: Model<CountryContentDocument>
  ) {}

  async getContent(countryId: string): Promise<ICountryContent> {
    const content = await this.countryContentModel.findOne({ countryId }).lean().exec();
    
    if (!content) {
      return this.createEmptyContent(countryId);
    }
    
    return content as unknown as ICountryContent;
  }

  async saveContent(countryContentDto: CountryContentDto): Promise<ICountryContent> {
    const { countryId, content, updatedBy } = countryContentDto;
    
    console.log('Saving content for countryId:', countryId);
    console.log('Content length:', content?.length);
    console.log('Content preview:', content?.substring(0, 100));
    
    const existingContent = await this.countryContentModel.findOne({ countryId }).exec();
    
    if (existingContent) {
      const updated = await this.countryContentModel.findOneAndUpdate(
        { countryId },
        { 
          content,
          updatedBy,
          updatedAt: new Date()
        },
        { new: true }
      ).lean().exec();
      
      return updated as unknown as ICountryContent;
    } else {
      const newContent = new this.countryContentModel({
        countryId,
        content,
        updatedBy,
        updatedAt: new Date()
      });
      
      const saved = await newContent.save();
      return saved.toObject() as ICountryContent;
    }
  }

  async deleteContent(countryId: string): Promise<void> {
    await this.countryContentModel.deleteOne({ countryId }).exec();
  }

  async getAllContents(): Promise<ICountryContent[]> {
    const contents = await this.countryContentModel.find().lean().exec();
    return contents as unknown as ICountryContent[];
  }

  private async createEmptyContent(countryId: string): Promise<ICountryContent> {
    const emptyContent = new this.countryContentModel({
      countryId,
      content: '',
      updatedAt: new Date()
    });
    
    const saved = await emptyContent.save();
    return saved.toObject() as ICountryContent;
  }
}