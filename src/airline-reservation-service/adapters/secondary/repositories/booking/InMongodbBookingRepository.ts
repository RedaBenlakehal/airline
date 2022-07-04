import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../../../../../airline-reservation-service/hexagon/domain-model/booking';
import { BookingRepository } from 'src/airline-reservation-service/hexagon/gateways/repositories/bookingRepository';
import { MongodbBooking, BookingDocument } from './booking.schema';

export class InMongodbBookingRepository implements BookingRepository {
  constructor(
    @InjectModel(MongodbBooking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async save(booking: Booking): Promise<void> {
    const createdBooking = new this.bookingModel(booking);

    await createdBooking.save();
  }

  async byId(bookingId: string): Promise<Booking | null> {
    const { _id, _from, _to, _price, _distance } =
      (await this.bookingModel.findById(bookingId)) as BookingDocument;

    return new Booking(_id, _from, _to, _distance, _price);
  }

  async dropAll(): Promise<void> {
    return await this.bookingModel.remove();
  }
}
