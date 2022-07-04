import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { Booking } from '../../../../../airline-reservation-service/hexagon/domain-model/booking';
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

  describe('create booking', () => {
    beforeEach(async () => {
      await repository.dropAll();
    });

    it('should be created successfully', async () => {
      await repository.save(
        new Booking(
          '62c2abd55bfc27f0b58f5646',
          'Paris',
          'New York',
          5800,
          5000,
        ),
      );

      const expectedBooking = await repository.byId('62c2abd55bfc27f0b58f5646');

      expect(expectedBooking).toEqual({
        _id: new Types.ObjectId('62c2abd55bfc27f0b58f5646'),
        _from: 'Paris',
        _to: 'New York',
        _distance: 5800,
        _price: 5000,
      });
    });
  });
});
