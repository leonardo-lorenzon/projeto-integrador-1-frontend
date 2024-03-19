import {ApplicationErrorCodes} from "@/contracts/errors/ApplicationErrorCodes";
import {ApiErrorMapper} from "@/api/error/ApiErrorMapper";
import isNil from "lodash/isNil";

export class ApiErrorParser {
  private readonly _response: Response
  constructor(response: Response) {
    this._response = response
  }

  public async toApplicationErrorCode(): Promise<ApplicationErrorCodes> {
    try {
      const error = await this._response.json();

      if (!isNil(error['code'])) {
        return new ApiErrorMapper().toApplicationErrorCode(error['code']);
      }

      return ApplicationErrorCodes.notMappedError;
    } catch (e: unknown) {
      return ApplicationErrorCodes.notMappedError;
    }
  }
}
