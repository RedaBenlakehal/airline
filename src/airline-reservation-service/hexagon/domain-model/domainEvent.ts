export abstract class DomainEvent {
  protected _id: string;
  protected _occurredOn: Date;
  constructor(_id: string, _occurredOn: Date) {
    this._id = _id;
    this._occurredOn = _occurredOn;
  }
}
