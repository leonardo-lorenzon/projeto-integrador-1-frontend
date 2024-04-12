export class Token {
  private readonly _token: string;
  private readonly _refreshToken: string;

  constructor(
    email: string,
    password: string
  ) {
    this._token = email;
    this._refreshToken = password;
  }

  get token(): string {
    return this._token;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  public static Empty(): Token {
    return new Token("", "");
  }

}
