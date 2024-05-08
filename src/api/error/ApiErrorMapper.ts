import {ApplicationErrorCodes} from "@/domain/contracts/errors/ApplicationErrorCodes";

export class ApiErrorMapper {
  private static readonly _errorMapper: Map<string, ApplicationErrorCodes> = new Map([
    ['USER_EMAIL_EXISTS', ApplicationErrorCodes.userEmailExists],
    ['FAIL_CREATE_USER_WITH_CREDENTIAL', ApplicationErrorCodes.failToCreateUserWithCredentials],
    ['INVALID_CREDENTIAL', ApplicationErrorCodes.invalidCredential],
    ['FAIL_TO_CREATE_TOKEN', ApplicationErrorCodes.failToCreateToken],
    ['FAIL_TO_ADD_SERVICE', ApplicationErrorCodes.failToAddService],
  ])

  public toApplicationErrorCode(apiErrorCode: string): ApplicationErrorCodes {
    const errorCode = ApiErrorMapper._errorMapper.get(apiErrorCode)

    return errorCode || ApplicationErrorCodes.notMappedError;
  }
}
