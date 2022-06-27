import { Booking } from '../domain-model/booking';
import { BookingCreatedEvent } from '../domain-model/bookingCreatedEvent';
import { DateProvider } from '../gateways/date-provision/dateProvider';
import { BookingRepository } from '../gateways/repositories/bookingRepository';
import { DomainEventRepository } from '../gateways/repositories/domainEventRepository';
import { UuidGenerator } from '../gateways/uuid-generation/uuidGenerator';

export class BookFlyCommandHandler {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly domainEventRepository: DomainEventRepository,
    private readonly dateProvider: DateProvider,
    private readonly domainEventUuidGenerator: UuidGenerator,
  ) {}

  async handle(booking: Booking) {
    const currentDay = this.dateProvider.now().getDay();
    let coefficient = 1;

    if (currentDay === 1) {
      coefficient = 50.7;
    }

    if (currentDay === 2) {
      coefficient = booking.distance - 10;
    }

    if (currentDay === 3) {
      coefficient = booking.from.length + booking.to.length;
    }

    booking.price = booking.distance * coefficient;

    await this.bookingRepository.save(booking);

    await this.domainEventRepository.save(
      new BookingCreatedEvent(
        this.domainEventUuidGenerator.generate(),
        this.dateProvider,
        booking.id,
      ),
    );
  }
}
