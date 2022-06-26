import { Booking } from '../../domain-model/booking';

export interface BookingRepository {
  save(booking: Booking): Promise<void>;
  byId(bookingId: string): Promise<Booking | null>;
}
