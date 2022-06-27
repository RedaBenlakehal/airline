import { DomainEvent } from '../../domain-model/domainEvent';

export interface DomainEventRepository {
  save(event: DomainEvent): Promise<void>;
}
