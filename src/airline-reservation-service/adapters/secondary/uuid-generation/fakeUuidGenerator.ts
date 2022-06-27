import { UuidGenerator } from 'src/airline-reservation-service/hexagon/gateways/uuid-generation/uuidGenerator';

export class FakeUuidGenerator implements UuidGenerator {
  private _next: string | null = null;

  generate(): string {
    return this._next as string;
  }

  set next(value: string | null) {
    this._next = value;
  }
}
