import { Router } from 'express';
import * as RegulatorController from '../controllers/regulator.controller';
import { createValidator, updateValidator } from '../controllers/regulator.validator';

const router = new Router();

router.route('/regulators').get(
  RegulatorController.get
);

router.route('/regulators/:number').get(
  RegulatorController.show
);

router.route('/regulators').post(
  createValidator(),
  RegulatorController.create
);

router.route('/regulators/:number').put(
  updateValidator(),
  RegulatorController.update
);

router.route('/regulators/:number').delete(
  RegulatorController.destroy
);

module.exports = router;
