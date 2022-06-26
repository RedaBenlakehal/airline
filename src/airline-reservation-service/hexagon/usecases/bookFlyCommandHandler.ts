import { Booking } from '../domain-model/booking';
import { BookingRepository } from '../gateways/repositories/bookingRepository';

export class BookFlyCommandHandler {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async handle(booking: Booking) {
    await this.bookingRepository.save(booking);
  }
}
