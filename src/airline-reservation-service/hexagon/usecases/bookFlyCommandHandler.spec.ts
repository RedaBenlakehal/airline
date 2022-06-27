import { InMemoryDomainEventRepository } from '../../../airline-reservation-service/adapters/secondary/repositories/inMemoryDomainEventRepository';
import { FakeDateProvider } from '../../../airline-reservation-service/adapters/secondary/date-provision/fakeDateProvider';
import { InMemoryBookingRepository } from '../../../airline-reservation-service/adapters/secondary/repositories/InMemoryBookingRepository';
import { Booking } from '../domain-model/booking';
import { BookingCreatedEvent } from '../domain-model/bookingCreatedEvent';
import { BookFlyCommandHandler } from './bookFlyCommandHandler';
import { FakeUuidGenerator } from '../../../airline-reservation-service/adapters/secondary/uuid-generation/fakeUuidGenerator';

describe('book a fly', () => {
  let bookFlyCommandHandler: BookFlyCommandHandler;
  let bookingRepository: InMemoryBookingRepository;
  let domainEventRepository: InMemoryDomainEventRepository;
  let dateProvider: FakeDateProvider;
  let domainEventUuidGenerator: FakeUuidGenerator;

  beforeEach(() => {
    bookingRepository = new InMemoryBookingRepository();
    domainEventRepository = new InMemoryDomainEventRepository();
    dateProvider = new FakeDateProvider();
    domainEventUuidGenerator = new FakeUuidGenerator();
    bookFlyCommandHandler = new BookFlyCommandHandler(
      bookingRepository,
      domainEventRepository,
      dateProvider,
      domainEventUuidGenerator,
    );
  });

  describe('book on date when coefficient equal to 1', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/26/22');
    });

    it('should book a fly successfully', async () => {
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

    it('should book a fly successfully on Monday', async () => {
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

    it('should book a fly successfully on Tuesday', async () => {
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

    it('should book a fly successfully on Wednesday', async () => {
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

  describe('book when coefficient is one and domain event is created successfully', () => {
    beforeEach(() => {
      dateProvider.dateOfNow = new Date('6/26/22');
      domainEventUuidGenerator.next = '123abc';
    });

    it('should book a fly successfully and create a domain event successfully', async () => {
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

      expect(domainEventRepository.events).toEqual([
        new BookingCreatedEvent(
          domainEventUuidGenerator.generate(),
          dateProvider,
          'abc123',
        ),
      ]);
    });
  });
});
