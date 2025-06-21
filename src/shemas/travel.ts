import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ITravel } from 'src/interface/travel';
 
export type TravelDocument = HydratedDocument<Travel>;
 
@Schema()
export class Travel implements ITravel {
    @Prop() id: string;
    @Prop() country: string;
    @Prop() city: string;
    @Prop() short_description: string;
    @Prop() description: string;
    @Prop() flag: string;
    @Prop() img: string;
    @Prop() year: number;
    @Prop() featured: boolean;
    @Prop() top: string;
    @Prop() left: string;
}
 
export const TravelSchema = SchemaFactory.createForClass(Travel);