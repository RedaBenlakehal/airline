import { InMemoryBookingRepository } from '../../../airline-reservation-service/adapters/secondary/repositories/InMemoryBookingRepository';
import { Booking } from '../domain-model/booking';
import { SearchBookingQueryHandler } from './searchBookingQueryHandler';

describe('search booking', () => {
  let searchBookingQueryHandler: SearchBookingQueryHandler;
  let bookingRepository: InMemoryBookingRepository;

  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    searchBookingQueryHandler = new SearchBookingQueryHandler(
      bookingRepository,
    );
  });

  describe('find booking successfully', () => {
    beforeEach(() => {
      bookingRepository.bookings = {
        abc123: new Booking('abc123', 'Paris', 'New York', 5834, 5834),
      };
    });

    it('should find booking by id successfully', async () => {
      expect(await searchBookingQueryHandler.handle('abc123')).toEqual({
        _id: 'abc123',
        _from: 'Paris',
        _to: 'New York',
        _distance: 5834,
        _price: 5834,
      });
    });
  });

  describe('booking with required id does not exist', () => {
    it('should not find booking with required id', async () => {
      await expect(searchBookingQueryHandler.handle('abc123')).rejects.toThrow(
        "booking with id abc123 doesn't exist!",
      );
    });
  });
});
