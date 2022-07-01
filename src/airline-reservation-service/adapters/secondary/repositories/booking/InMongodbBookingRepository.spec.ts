import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongodbBooking, BookingSchema } from './booking.schema';

import { InMongodbBookingRepository } from './InMongodbBookingRepository';

describe('InMongodbBookingRepository', () => {
  let repository: InMongodbBookingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:/airline'),
        MongooseModule.forFeature([
          { name: MongodbBooking.name, schema: BookingSchema },
        ]),
      ],
      providers: [InMongodbBookingRepository],
    }).compile();

    repository = module.get<InMongodbBookingRepository>(
      InMongodbBookingRepository,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
