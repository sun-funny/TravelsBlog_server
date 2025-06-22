import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IPoint } from 'src/interface/point';
import { Types } from 'mongoose';
 
export type PointDocument = HydratedDocument<Point>;
 
@Schema()
export class Point implements IPoint {
     @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    _id: Types.ObjectId;
    
    @Prop({ required: true })
    id: string;

    @Prop() name: string;
    @Prop() description: string;
    @Prop() img: string[];
    @Prop() id_country: string;
}
 
export const PointSchema = SchemaFactory.createForClass(Point);
