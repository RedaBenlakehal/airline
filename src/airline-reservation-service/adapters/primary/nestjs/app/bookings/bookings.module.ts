import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import {
  BookingSchema,
  MongodbBooking,
} from 'src/airline-reservation-service/adapters/secondary/repositories/booking/booking.schema';

import { RealDateProvider } from 'src/airline-reservation-service/adapters/secondary/date-provision/realDateProvider';
import { RealUuidGenerator } from 'src/airline-reservation-service/adapters/secondary/uuid-generation/realUuidGenerator';

import { InMongodbBookingRepository } from 'src/airline-reservation-service/adapters/secondary/repositories/booking/InMongodbBookingRepository';
import { InMemoryDomainEventRepository } from 'src/airline-reservation-service/adapters/secondary/repositories/inMemoryDomainEventRepository';

import { BookFlyCommandHandler } from 'src/airline-reservation-service/hexagon/usecases/bookFlyCommandHandler';

import { BookingsController } from './bookings.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongodbBooking.name, schema: BookingSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [
    BookingService,
    {
      provide: BookFlyCommandHandler,
      useFactory: (
        inMongodbBookingRepository: InMongodbBookingRepository,
        inMemoryDomainEventRepository: InMemoryDomainEventRepository,
        realDateProvider: RealDateProvider,
        realUuidGenerator: RealUuidGenerator,
      ) => {
        return new BookFlyCommandHandler(
          inMongodbBookingRepository,
          inMemoryDomainEventRepository,
          realDateProvider,
          realUuidGenerator,
          realUuidGenerator,
        );
      },
      inject: [
        'inMongodbBookingRepository',
        'inMemoryDomainEventRepository',
        'realDateProvider',
        'realUuidGenerator',
        'realUuidGenerator',
      ],
    },

    {
      provide: 'inMongodbBookingRepository',
      useClass: InMongodbBookingRepository,
    },

    {
      provide: 'inMemoryDomainEventRepository',
      useClass: InMemoryDomainEventRepository,
    },

    {
      provide: 'realDateProvider',
      useClass: RealDateProvider,
    },

    {
      provide: 'realUuidGenerator',
      useClass: RealUuidGenerator,
    },
  ],
})
export class BookingsModule {}
