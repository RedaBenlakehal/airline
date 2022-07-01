import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Booking } from 'src/airline-reservation-service/hexagon/domain-model/booking';
import { BookingRepository } from 'src/airline-reservation-service/hexagon/gateways/repositories/bookingRepository';

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

export class InMongodbBookingRepository implements BookingRepository {
  constructor(
    @InjectModel(MongodbBooking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async save(booking: Booking): Promise<void> {
    const createdBooking = new this.bookingModel({
      _from: booking.from,
      _to: booking.to,
      _distance: booking.distance,
      _price: booking.price,
    });

    const test = await this.bookingModel.findById('62be371f94ae315e277e83fa');
    console.log(test);

    await createdBooking.save();
  }

  async byId(bookingId: string): Promise<Booking | null> {
    throw new Error('Method not implemented.');
  }
}
