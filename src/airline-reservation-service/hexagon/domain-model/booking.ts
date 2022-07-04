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
}
