import * as mongoose from "mongoose";
export interface ITravel {
  id: string;
  country: string;
  city?: string;
  short_description: string;
  description: string;
  flag: string;
  img: string;
  year: number;
  featured: boolean;
  _id?: mongoose.Types.ObjectId;
}