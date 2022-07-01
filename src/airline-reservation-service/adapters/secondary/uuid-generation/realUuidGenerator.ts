import { UuidGenerator } from 'src/airline-reservation-service/hexagon/gateways/uuid-generation/uuidGenerator';
import { v4 as uuid } from 'uuid';
export class RealUuidGenerator implements UuidGenerator {
  generate(): string {
    return uuid();
  }
}
