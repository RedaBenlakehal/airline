import { DateProvider } from '../../../../airline-reservation-service/hexagon/gateways/date-provision/dateProvider';

export class FakeDateProvider implements DateProvider {
  private _dateOfNow: Date | null = null;

  now(): Date {
    return this._dateOfNow as Date;
  }

  set dateOfNow(value: Date | null) {
    this._dateOfNow = value;
  }
}
