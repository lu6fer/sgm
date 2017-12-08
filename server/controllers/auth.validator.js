import { check } from 'express-validator/check';

export function loginValidator() {
  return [
    check('email', 'email address not valid')
      .isEmail()
      .trim(),
    check('password', 'password is mandatory')
      .exists()
  ];
}

export function resetValidator() {
  return [
    check('oldPassword', 'oldPassword is mandatory')
      .optional({
        checkFalsy: true
      }),
    check('password', 'password is mandatory')
      .exists(),
    check('confirmPassword', 'password don\'t match')
      .exists()
      .custom((value, { req }) => value === req.body.password)
  ];
}
