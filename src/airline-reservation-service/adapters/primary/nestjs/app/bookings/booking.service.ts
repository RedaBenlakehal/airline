import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookingDto } from 'src/airline-reservation-service/adapters/secondary/repositories/booking/dtos/create.dto';
import { BookFlyCommandHandler } from 'src/airline-reservation-service/hexagon/usecases/bookFlyCommandHandler';

@Injectable()
export class BookingService {
  constructor(private readonly bookFlyCommandHandler: BookFlyCommandHandler) {}

  async save(createBookingDto: CreateBookingDto): Promise<string> {
    try {
      const { from, to, distance } = createBookingDto;
      await this.bookFlyCommandHandler.handle(from, to, distance);

      return 'booking has been created successfully!';
    } catch (error) {
      throw new InternalServerErrorException('some errors');
    }
  }
}
