import {ApplicationErrorCodes} from "@/contracts/errors/ApplicationErrorCodes";

export class NotificationError {
  private readonly _errorCodes: ApplicationErrorCodes[] = [];

  public add(error: ApplicationErrorCodes): void {
    this._errorCodes.push(error);
  }

  public hasAnyError(): boolean {
    return this._errorCodes.length > 0;
  }

  public getFirstErrorCode(): ApplicationErrorCodes {
    return this._errorCodes[0];
  }

  public getErrorCodes(): ApplicationErrorCodes[] {
    return this._errorCodes;
  }
}
