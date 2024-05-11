export class SearchService {
  private readonly _type: string;

  constructor(
    type: string,
  ) {
    this._type = type;
  }

  get type(): string {
    return this._type;
  }
}
