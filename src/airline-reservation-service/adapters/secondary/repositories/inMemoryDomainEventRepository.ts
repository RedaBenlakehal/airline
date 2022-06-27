import { DomainEvent } from 'src/airline-reservation-service/hexagon/domain-model/domainEvent';
import { DomainEventRepository } from 'src/airline-reservation-service/hexagon/gateways/repositories/domainEventRepository';

export class InMemoryDomainEventRepository implements DomainEventRepository {
  private _events: DomainEvent[] = [];

  async save(event: DomainEvent): Promise<void> {
    this._events.push(event);
  }

  get events() {
    return this._events;
  }
}
