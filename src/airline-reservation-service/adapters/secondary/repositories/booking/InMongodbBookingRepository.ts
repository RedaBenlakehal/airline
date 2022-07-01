import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/airline-reservation-service/hexagon/domain-model/booking';
import { BookingRepository } from 'src/airline-reservation-service/hexagon/gateways/repositories/bookingRepository';
import { MongodbBooking, BookingDocument } from './booking.schema';

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

    await createdBooking.save();
  }

  async byId(bookingId: string): Promise<Booking | null> {
    throw new Error('Method not implemented.');
  }
}
