import { FakeDateProvider } from '../../../airline-reservation-service/adapters/secondary/date-provision/fakeDateProvider';
import { InMemoryBookingRepository } from '../../../airline-reservation-service/adapters/secondary/repositories/InMemoryBookingRepository';
import { Booking } from '../domain-model/booking';
import { BookFlyCommandHandler } from './bookFlyCommandHandler';

describe('book a fly', () => {
  let bookFlyCommandHandler: BookFlyCommandHandler;
  let bookingRepository: InMemoryBookingRepository;
  let dateProvider: FakeDateProvider;

  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    dateProvider = new FakeDateProvider();
    bookFlyCommandHandler = new BookFlyCommandHandler(
      bookingRepository,
      dateProvider,
    );
  });

  describe('book on date when coefficient equal to 1', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/26/22');
    });

    it('book a fly successfully', async () => {
      bookFlyCommandHandler.handle(
        new Booking('abc123', 'Paris', 'New York', 5834),
      );

      expect(await bookingRepository.byId('abc123')).toEqual({
        _id: 'abc123',
        _from: 'Paris',
        _to: 'New York',
        _distance: 5834,
        _price: 5834,
      });
    });
  });

  describe('book when day is Monday', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/27/22');
    });

    it('book a fly successfully on Monday', async () => {
      bookFlyCommandHandler.handle(
        new Booking('abc123', 'Paris', 'New York', 5834),
      );

      expect(await bookingRepository.byId('abc123')).toEqual({
        _id: 'abc123',
        _from: 'Paris',
        _to: 'New York',
        _distance: 5834,
        _price: 5834 * 50.7,
      });
    });
  });

  describe('book when day is Tuesday', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/28/22');
    });

    it('book a fly successfully on Monday', async () => {
      bookFlyCommandHandler.handle(
        new Booking('abc123', 'Paris', 'New York', 5834),
      );

      expect(await bookingRepository.byId('abc123')).toEqual({
        _id: 'abc123',
        _from: 'Paris',
        _to: 'New York',
        _distance: 5834,
        _price: 5834 * 5824,
      });
    });
  });

  describe('book when day is Wednesday', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/29/22');
    });

    it('book a fly successfully on Monday', async () => {
      bookFlyCommandHandler.handle(
        new Booking('abc123', 'Paris', 'New York', 5834),
      );

      expect(await bookingRepository.byId('abc123')).toEqual({
        _id: 'abc123',
        _from: 'Paris',
        _to: 'New York',
        _distance: 5834,
        _price: 5834 * ('Paris'.length + 'New York'.length),
      });
    });
  });
});
