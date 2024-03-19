export class UserRegister {
  private readonly _name: string;
  private readonly _surname: string;
  private readonly _email: string;
  private readonly _password: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._password = password;
  }

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this._surname;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

}
