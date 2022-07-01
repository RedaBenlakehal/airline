import { DateProvider } from 'src/airline-reservation-service/hexagon/gateways/date-provision/dateProvider';

export class RealDateProvider implements DateProvider {
  now(): Date {
    return new Date();
  }
}
