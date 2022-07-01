import { Controller, Post } from '@nestjs/common';
import { BookFlyCommandHandler } from 'src/airline-reservation-service/hexagon/usecases/bookFlyCommandHandler';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookFlyCommandHandler: BookFlyCommandHandler) {}

  @Post()
  async save(): Promise<void> {
    return await this.bookFlyCommandHandler.handle(
      'Paris',
      'New York',
      2561561,
    );
  }
}
