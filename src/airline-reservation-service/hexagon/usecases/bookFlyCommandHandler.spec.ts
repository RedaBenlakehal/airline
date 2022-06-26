import { InMemoryBookingRepository } from '../../../airline-reservation-service/adapters/secondary/repositories/InMemoryBookingRepository';
import { Booking } from '../domain-model/booking';
import { BookingRepository } from '../gateways/repositories/bookingRepository';
import { BookFlyCommandHandler } from './bookFlyCommandHandler';

describe('book a fly', () => {
  let bookFlyCommandHandler: BookFlyCommandHandler;
  let bookingRepository: BookingRepository;

  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    bookFlyCommandHandler = new BookFlyCommandHandler(bookingRepository);
  });

  it('book a fly successfully ', async () => {
    bookFlyCommandHandler.handle(
      new Booking('abc123', 'Paris', 'New York', 500),
    );

    expect(await bookingRepository.byId('abc123')).toEqual({
      _id: 'abc123',
      _from: 'Paris',
      _to: 'New York',
      _price: 500,
    });
  });
});
