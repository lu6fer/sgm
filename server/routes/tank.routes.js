import { Router } from 'express';
import * as TankController from '../controllers/tank.controller';
import { createValidator, updateValidator } from '../controllers/tank.validator';

const router = new Router();

router.route('/tanks').get(
  TankController.get
);

router.route('/tanks/:number').get(
  TankController.show
);

router.route('/tanks').post(
  createValidator(),
  TankController.create
);

router.route('/tanks/:number').put(
  updateValidator(),
  TankController.update
);

router.route('/tanks/:number').delete(
  TankController.destroy
);

module.exports = router;
