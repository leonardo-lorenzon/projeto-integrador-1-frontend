export class Service {
  private readonly _id: string;
  private readonly _accountId: string;
  private readonly _type: string;
  private readonly _description: string;
  private readonly _city: string;
  private readonly _state: string;
  private readonly _country: string;

  constructor(
    id: string,
    accountId: string,
    type: string,
    description: string,
    city: string,
    state: string,
    country: string
  ) {
    this._id = id;
    this._accountId = accountId;
    this._type = type;
    this._description = description;
    this._city = city;
    this._state = state;
    this._country = country;
  }

  get id(): string {
    return this._id;
  }

  get accountId(): string {
    return this._accountId;
  }

  get type(): string {
    return this._type;
  }

  get description(): string {
    return this._description;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get country(): string {
    return this._country;
  }
}
