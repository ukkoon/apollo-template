import { CustomError } from "../interface/errors"

export function toError(args: CustomError) {
    return Error(JSON.stringify(args))
}