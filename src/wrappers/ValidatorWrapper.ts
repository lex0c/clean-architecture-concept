import Joi from 'joi';

export default class ValidatorWrapper {
  public static number(value: number) {
    return (Joi.number().validate(value)).error;
  }

  public static text(value: string) {
    return (Joi.string().validate(value)).error;
  }

  public static email(value: string) {
    return (
      Joi.string()
        .email({ minDomainSegments: 2 })
        .lowercase()
        .required()
        .validate(value)
    ).error;
  }

  public static password(value: string) {
    return (
      Joi.string()
        .min(6).max(255)
        .required()
        .validate(value)
    ).error;
  }
}
