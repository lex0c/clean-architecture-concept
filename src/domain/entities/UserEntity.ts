import { JoiValidatorAdapter } from '../../adapters';

export default class UserEntity {
  public readonly id?: number;
  public readonly name?: string;
  public readonly email?: string;
  public readonly password?: string;

  constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
  ) {
    const idValidateError = id ? JoiValidatorAdapter.number(id) : false;
    const nameValidateError = name ? JoiValidatorAdapter.text(name) : false;
    const emailValidateError = email ? JoiValidatorAdapter.email(email) : false;
    const passwordValidateError = password ? JoiValidatorAdapter.password(password) : false;

    const error = idValidateError
      || nameValidateError
      || emailValidateError
      || passwordValidateError;

    if (error) {
      throw new Error(`Validation failed\n ${error}`);
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
