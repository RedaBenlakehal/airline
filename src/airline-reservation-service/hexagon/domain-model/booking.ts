export class Booking {
  private _price: number;

  constructor(
    private _id: string,
    private _from: string,
    private _to: string,
    private _distance: number,
    _price?: number,
  ) {
    if (_price) {
      this._price = _price;
    }
  }

  get id(): string {
    return this._id;
  }

  get from(): string {
    return this._from;
  }

  get to(): string {
    return this._to;
  }

  get distance(): number {
    return this._distance;
  }

  get price(): number {
    return this._price;
  }
}
