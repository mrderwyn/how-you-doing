export const notEmptyStringCheck = (value: string) => !/^\\s*$/.test(value)

export const postIsValid = (text: string, images: File[]) => notEmptyStringCheck(text) || images.length > 0

export const usernameIsValid = (name: string) => /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/.test(name)

export const createValidator = <T>(...args: Array<(value: T) => boolean>) => (value: T) =>
  args.every(validator => validator(value))

export const defaultUsernameValidator = createValidator(notEmptyStringCheck, usernameIsValid)
