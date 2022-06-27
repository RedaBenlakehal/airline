import { DateProvider } from '../gateways/date-provision/dateProvider';
import { DomainEvent } from './domainEvent';

export class BookingCreatedEvent extends DomainEvent {
  constructor(
    id: string,
    dateProvider: DateProvider,
    private _bookingId: string,
  ) {
    super(id, dateProvider.now());
    this._bookingId = _bookingId;
  }
}
