import { Router } from 'express';
import passport from 'passport';
// import { roleAuthorization } from '../services/roles.authorization';
import { createValidator, updateValidator } from '../controllers/user.validator';
import * as UserController from '../controllers/user.controller';
const router = new Router();


router.route('/users')
    .get(
      passport.authenticate('jwt', { session: false }),
      // roleAuthorization(['admin']),
      UserController.get
    )
    .post(
        // passport.authenticate('jwt', { session: false }),
        // roleAuthorization(['admin']),
        createValidator(),
        UserController.create
    );

router.route('/users/:slug')
    .get(
      // passport.authenticate('jwt', { session: false }),
      UserController.show
    )
    .put(
        updateValidator(),
        UserController.update
    )
    .delete(
        // passport.authenticate('jwt', { session: false }),
        // roleAuthorization(['admin']),
        UserController.destroy
    );

module.exports = router;
