export class Booking {
  constructor(
    private _id: string,
    private _from: string,
    private _to: string,
    private _price: number,
  ) {}

  get id(): string {
    return this._id;
  }
}
