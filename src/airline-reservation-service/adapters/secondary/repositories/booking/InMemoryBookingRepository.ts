import { Booking } from 'src/airline-reservation-service/hexagon/domain-model/booking';
import { BookingRepository } from 'src/airline-reservation-service/hexagon/gateways/repositories/bookingRepository';

export class InMemoryBookingRepository implements BookingRepository {
  private _bookings: Record<string, Booking> = {};

  async save(booking: Booking): Promise<void> {
    this._bookings[booking.id] = booking;
  }

  async byId(bookingId: string): Promise<Booking | null> {
    return this._bookings[bookingId];
  }

  get bookings() {
    return this._bookings;
  }

  set bookings(bookings: Record<string, Booking>) {
    this._bookings = bookings;
  }
}
