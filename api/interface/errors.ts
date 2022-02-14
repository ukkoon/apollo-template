export interface CustomError {
    key: ErrorKey
}

type ErrorKey =
    "errors.notAuthorized"
    | "errors.userNotExist"
    | "errors.notExistField"
    