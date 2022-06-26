import { BookingRepository } from '../gateways/repositories/bookingRepository';

export class SearchBookingQueryHandler {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async handle(bookingId: string) {
    const foundBooking = await this.bookingRepository.byId(bookingId);

    if (!foundBooking) {
      throw new Error("booking with id abc123 doesn't exist!");
    }

    return foundBooking;
  }
}
