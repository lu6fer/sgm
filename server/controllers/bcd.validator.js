import { check } from 'express-validator/check';
import Bcd from '../models/bcd';


export function createValidator() {
  return [
    check('number', 'number is mandatory')
      .optional({
        checkFalsy: true
      })
      .isNumeric()
      .trim()
      .toInt()
      .custom(number => {
        return Bcd.numberExist(number).then(
          bcd => {
            throw new Error(`${bcd.number} already in use`);
          },
          () => {
            return true;
          }
        );
      }),
    check('brand', 'brand is mandatory')
      .exists()
      .trim(),
    check('model', 'model is mandatory')
      .exists()
      .trim(),
    check('size', 'size is mandatory')
      .exists()
      .isIn(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'])
      .withMessage("size can only be on of : 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'")
      .trim(),
    check('status', 'status is mandatory')
      .exists()
      .isIn(['En service', 'Réformé', 'Vendu',
        'Perdu', 'Disparu', 'Echangé',
        'Mis en vente', 'Résilié'])
      .withMessage("status can only be on of: 'En service', 'Réformé', 'Vendu', 'Perdu', 'Disparu', 'Echangé', 'Mis en vente', 'Résilié'")
      .trim(),
    check('buy.date', 'date should be in ISO8601 format')
      .optional({
        checkFalsy: true
      })
      .isISO8601(),
    check('buy.price')
      .optional({
        checkFalsy: true
      })
      .isFloat()
      .toInt()
  ];
}

export function updateValidator() {
  return [
    check('brand', 'brand is mandatory')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('model', 'model is mandatory')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('size', 'size is mandatory')
      .optional({
        checkFalsy: true
      })
      .isIn(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'])
      .withMessage("size can only be on of : 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'")
      .trim(),
    check('status', 'status is mandatory')
      .optional({
        checkFalsy: true
      })
      .isIn(['En service', 'Réformé', 'Vendu',
        'Perdu', 'Disparu', 'Echangé',
        'Mis en vente', 'Résilié'])
      .withMessage("status can only be on of: 'En service', 'Réformé', 'Vendu', 'Perdu', 'Disparu', 'Echangé', 'Mis en vente', 'Résilié'")
      .trim(),
    check('buy.date', 'date should be in ISO8601 format')
      .optional({
        checkFalsy: true
      })
      .isISO8601(),
    check('buy.price')
      .optional({
        checkFalsy: true
      })
      .isNumeric()
      .toInt()
  ];
}
