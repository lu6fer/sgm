import { check } from 'express-validator/check';
import User from '../models/user';

export function createValidator() {
  return [
    check('email', 'email address not valid')
      .isEmail()
      .trim()
      .custom(email => {
        return User.emailExist(email).then(
          user => {
            throw new Error(`${user.email} already in use`);
          },
          () => {
            return true;
          }
         );
      }),
    check('lastName', 'lastName is mandatory')
      .exists()
      .trim()
      .escape(),
    check('firstName', 'firstName is mandatory')
      .exists()
      .trim()
      .escape()
  ];
}

export function updateValidator() {
  return [
    check('email', 'email address not valid')
      .optional({ checkFalsy: true })
      .isEmail()
      .trim(),
    check('lastName', 'lastName is mandatory')
      .optional({ checkFalsy: true })
      .exists()
      .trim()
      .escape(),
    check('firstName', 'firstName is mandatory')
      .optional({ checkFalsy: true })
      .exists()
      .trim()
      .escape()
  ];
}
