import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { loginValidator, resetValidator } from '../controllers/auth.validator';
import passport from 'passport';

const router = new Router();

router.route('/login').post(
  loginValidator(),
  AuthController.login
);

router.route('/reset/:slug').post(
  passport.authenticate('jwt', { session: false }),
  resetValidator(),
  AuthController.resetPassword
);

module.exports = router;
