import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ autoCreate: true })
export class MongodbBooking {
  @Prop()
  _from: string;

  @Prop()
  _to: string;

  @Prop()
  _distance: number;

  @Prop()
  _price: number;
}

export type BookingDocument = MongodbBooking & Document;

export const BookingSchema = SchemaFactory.createForClass(MongodbBooking);
