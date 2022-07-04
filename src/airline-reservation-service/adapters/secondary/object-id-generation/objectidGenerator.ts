import { Types } from 'mongoose';
import { UuidGenerator } from 'src/airline-reservation-service/hexagon/gateways/uuid-generation/uuidGenerator';

export class ObjectIdGenerator implements UuidGenerator {
  generate(): string {
    return new Types.ObjectId().toString();
  }
}
