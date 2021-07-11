import { ValidatorWrapper } from '../../wrappers';

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
    const idValidateError = id ? ValidatorWrapper.number(id) : false;
    const nameValidateError = name ? ValidatorWrapper.text(name) : false;
    const emailValidateError = email ? ValidatorWrapper.email(email) : false;
    const passwordValidateError = password ? ValidatorWrapper.password(password) : false;

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
