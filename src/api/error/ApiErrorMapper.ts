import {ApplicationErrorCodes} from "@/contracts/errors/ApplicationErrorCodes";

export class ApiErrorMapper {
  private static readonly _errorMapper: Map<string, ApplicationErrorCodes> = new Map([
    ['USER_EMAIL_EXISTS', ApplicationErrorCodes.userEmailExists]
  ])

  public toApplicationErrorCode(apiErrorCode: string): ApplicationErrorCodes {
    const errorCode = ApiErrorMapper._errorMapper.get(apiErrorCode)

    return errorCode || ApplicationErrorCodes.notMappedError;
  }
}
