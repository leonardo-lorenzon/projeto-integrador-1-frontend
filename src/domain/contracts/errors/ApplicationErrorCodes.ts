// These are the error codes handled by the application
export enum ApplicationErrorCodes {
  notMappedError = 'notMappedError',

  // registerUser
  userEmailExists = 'userEmailExists',
  failToCreateUserWithCredentials = 'failToCreateUserWithCredentials',

  // login
  invalidCredential = 'invalidCredential',
  failToCreateToken = 'failToCreateToken',

  // add service
  failToAddService = 'failToAddService'
}
