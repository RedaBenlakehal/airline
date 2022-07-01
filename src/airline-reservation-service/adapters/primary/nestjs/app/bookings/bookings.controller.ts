import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateBookingDto } from 'src/airline-reservation-service/adapters/secondary/repositories/booking/dtos/create.dto';

import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async save(
    @Body(ValidationPipe) createBookingDto: CreateBookingDto,
  ): Promise<string> {
    return await this.bookingService.save(createBookingDto);
  }
}
