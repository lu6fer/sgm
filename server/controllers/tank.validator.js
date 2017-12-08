import { check } from 'express-validator/check';
import Tank from '../models/tank';


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
        return Tank.numberExist(number).then(
          tank => {
            throw new Error(`${tank.number} already in use`);
          },
          () => {
            return true;
          }
        );
      }),
    check('cylinder.brand', 'brand is mandatory')
      .exists()
      .trim(),
    check('cylinder.model', 'model is mandatory')
      .exists()
      .trim(),
    check('cylinder.size', 'size is mandatory')
      .exists()
      .trim(),
    check('buy.date', 'date should be in ISO8601 format')
      .optional({
        checkFalsy: true
      })
      .isISO8601(),
    check('cylinder.serialNumber')
      .exists()
      .trim(),
    check('cylinder.threadType')
      .exists()
      .trim(),
    check('cylinder.pressure.operating')
      .isNumeric()
      .toInt(),
    check('cylinder.pressure.test')
      .isNumeric()
      .toInt(),
    check('valve.model')
      .trim(),
    check('valve.brand')
      .exists()
      .trim(),
    check('valve.serialNumber')
      .exists()
      .trim(),
    check('buy.price')
      .optional({
        checkFalsy: true
      })
      .isNumeric()
      .toInt(),
    check('status', 'status is mandatory')
      .exists()
      .isIn(['En service', 'Réformé', 'Vendu',
        'Perdu', 'Disparu', 'Echangé',
        'Mis en vente', 'Résilié'])
      .withMessage("status can only be on of: 'En service', 'Réformé', 'Vendu', 'Perdu', 'Disparu', 'Echangé', 'Mis en vente', 'Résilié'")
      .trim(),
    check('usage', 'usage is mandatory')
      .exists()
      .isIn(['Air', 'Nitrox', 'O2'])
      .withMessage("usage can only be one of: 'Air', 'Nitrox', 'O2'")
      .trim()
  ];
}

export function updateValidator() {
  return [
    check('cylinder.brand', 'brand is mandatory')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('cylinder.model', 'model is mandatory')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('cylinder.size', 'size is mandatory')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('buy.date', 'date should be in ISO8601 format')
      .optional({
        checkFalsy: true
      })
      .isISO8601(),
    check('cylinder.serialNumber')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('cylinder.threadType')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('cylinder.pressure.operating')
      .isNumeric()
      .toInt(),
    check('cylinder.pressure.test')
      .isNumeric()
      .toInt(),
    check('valve.model')
      .trim(),
    check('valve.brand')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('valve.serialNumber')
      .optional({
        checkFalsy: true
      })
      .trim(),
    check('buy.price')
      .optional({
        checkFalsy: true
      })
      .isFloat()
      .toInt(),
    check('status', 'status is mandatory')
      .optional({
        checkFalsy: true
      })
      .isIn(['En service', 'Réformé', 'Vendu',
        'Perdu', 'Disparu', 'Echangé',
        'Mis en vente', 'Résilié'])
      .withMessage("status can only be on of: 'En service', 'Réformé', 'Vendu', 'Perdu', 'Disparu', 'Echangé', 'Mis en vente', 'Résilié'")
      .trim(),
    check('usage', 'usage is mandatory')
      .optional({
        checkFalsy: true
      })
      .isIn(['Air', 'Nitrox', 'O2'])
      .withMessage("usage can only be one of: 'Air', 'Nitrox', 'O2'")
      .trim()
  ];
}
