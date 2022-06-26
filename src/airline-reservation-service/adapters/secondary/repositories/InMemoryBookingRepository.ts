import { Booking } from 'src/airline-reservation-service/hexagon/domain-model/booking';
import { BookingRepository } from 'src/airline-reservation-service/hexagon/gateways/repositories/bookingRepository';

export class InMemoryBookingRepository implements BookingRepository {
  private bookings: Record<string, Booking> = {};

  async save(booking: Booking): Promise<void> {
    this.bookings[booking.id] = booking;
  }

  async byId(bookingId: string): Promise<Booking | null> {
    return this.bookings[bookingId];
  }
}
