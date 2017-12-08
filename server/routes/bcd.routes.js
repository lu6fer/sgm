import { Router } from 'express';
import * as BcdController from '../controllers/bcd.controller';
import { createValidator, updateValidator } from '../controllers/bcd.validator';

const router = new Router();

router.route('/bcds').get(
  BcdController.get
);

router.route('/bcds/:number').get(
  BcdController.show
);

router.route('/bcds').post(
  createValidator(),
  BcdController.create
);

router.route('/bcds/:number').put(
  updateValidator(),
  BcdController.update
);

router.route('/bcds/:number').delete(
  BcdController.destroy
);

module.exports = router;
