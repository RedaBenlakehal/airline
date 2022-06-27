import { InMemoryDomainEventRepository } from '../../../airline-reservation-service/adapters/secondary/repositories/inMemoryDomainEventRepository';
import { FakeDateProvider } from '../../../airline-reservation-service/adapters/secondary/date-provision/fakeDateProvider';
import { InMemoryBookingRepository } from '../../../airline-reservation-service/adapters/secondary/repositories/InMemoryBookingRepository';
import { BookingCreatedEvent } from '../domain-model/bookingCreatedEvent';
import { BookFlyCommandHandler } from './bookFlyCommandHandler';
import { FakeUuidGenerator } from '../../../airline-reservation-service/adapters/secondary/uuid-generation/fakeUuidGenerator';
import { Booking } from '../domain-model/booking';

describe('book a fly', () => {
  let bookFlyCommandHandler: BookFlyCommandHandler;
  let bookingRepository: InMemoryBookingRepository;
  let domainEventRepository: InMemoryDomainEventRepository;
  let dateProvider: FakeDateProvider;
  let domainEventUuidGenerator: FakeUuidGenerator;
  let bookingUuidGenerator: FakeUuidGenerator;

  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    domainEventRepository = new InMemoryDomainEventRepository();
    dateProvider = new FakeDateProvider();
    domainEventUuidGenerator = new FakeUuidGenerator();
    bookingUuidGenerator = new FakeUuidGenerator();
    bookFlyCommandHandler = new BookFlyCommandHandler(
      bookingRepository,
      domainEventRepository,
      dateProvider,
      bookingUuidGenerator,
      domainEventUuidGenerator,
    );

    domainEventUuidGenerator.next = '123abc';
    bookingUuidGenerator.next = 'abc123';
  });

  describe('book on date when coefficient equal to 1', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/26/22');
    });

    it('should book a fly successfully', async () => {
      await bookFlyCommandHandler.handle('Paris', 'New York', 5834);

      expect(bookingRepository.bookings).toEqual({
        [bookingUuidGenerator.generate()]: new Booking(
          bookingUuidGenerator.generate(),
          'Paris',
          'New York',
          5834,
          5834,
        ),
      });
    });
  });

  describe('book when day is Monday', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/27/22');
    });

    it('should book a fly successfully on Monday', async () => {
      await bookFlyCommandHandler.handle('Paris', 'New York', 5834);

      expect(bookingRepository.bookings).toEqual({
        [bookingUuidGenerator.generate()]: new Booking(
          bookingUuidGenerator.generate(),
          'Paris',
          'New York',
          5834,
          5834 * 50.7,
        ),
      });
    });
  });

  describe('book when day is Tuesday', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/28/22');
    });

    it('should book a fly successfully on Tuesday', async () => {
      await bookFlyCommandHandler.handle('Paris', 'New York', 5834);

      expect(bookingRepository.bookings).toEqual({
        [bookingUuidGenerator.generate()]: new Booking(
          bookingUuidGenerator.generate(),
          'Paris',
          'New York',
          5834,
          5834 * 5824,
        ),
      });
    });
  });

  describe('book when day is Wednesday', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/29/22');
    });

    it('should book a fly successfully on Wednesday', async () => {
      await bookFlyCommandHandler.handle('Paris', 'New York', 5834);

      expect(bookingRepository.bookings).toEqual({
        [bookingUuidGenerator.generate()]: new Booking(
          bookingUuidGenerator.generate(),
          'Paris',
          'New York',
          5834,
          5834 * ('Paris'.length + 'New York'.length),
        ),
      });
    });
  });

  describe('book when coefficient is one and domain event is created successfully', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/26/22');
    });

    it('should book a fly successfully and create a domain event successfully', async () => {
      await bookFlyCommandHandler.handle('Paris', 'New York', 5834);

      expect(bookingRepository.bookings).toEqual({
        [bookingUuidGenerator.generate()]: new Booking(
          bookingUuidGenerator.generate(),
          'Paris',
          'New York',
          5834,
          5834,
        ),
      });

      expect(domainEventRepository.events).toEqual([
        new BookingCreatedEvent(
          domainEventUuidGenerator.generate(),
          dateProvider,
          bookingUuidGenerator.generate(),
        ),
      ]);
    });
  });
});
