export class ResponseParser {
  private readonly _response: Response
  constructor(response: Response) {
    this._response = response
  }

  public async parse<T>(): Promise<T> {
    try {
      return this._response.json();
    } catch (e: unknown) {
      throw new Error("Fail while parsing response");
    }
  }
}
