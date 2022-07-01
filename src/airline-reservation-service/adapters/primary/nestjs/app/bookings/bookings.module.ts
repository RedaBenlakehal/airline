import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RealDateProvider } from 'src/airline-reservation-service/adapters/secondary/date-provision/realDateProvider';
import {
  BookingSchema,
  InMongodbBookingRepository,
  MongodbBooking,
} from 'src/airline-reservation-service/adapters/secondary/repositories/booking/InMongodbBookingRepository';
import { InMemoryDomainEventRepository } from 'src/airline-reservation-service/adapters/secondary/repositories/inMemoryDomainEventRepository';
import { RealUuidGenerator } from 'src/airline-reservation-service/adapters/secondary/uuid-generation/realUuidGenerator';
import { BookFlyCommandHandler } from 'src/airline-reservation-service/hexagon/usecases/bookFlyCommandHandler';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongodbBooking.name, schema: BookingSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [
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
