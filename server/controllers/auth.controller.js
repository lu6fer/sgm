import validationResult from '../utils/validationResult';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import serverConfig from '../config/constants';
import User from '../models/user';

/**
 * Log user
 * @param req
 * @param res
 */
export function login(req, res) {
  // Data validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: errors.array()
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user || !user.validPassword(req.body.password)) {
        return res.status(401).json({
          error: true,
          message: [{
              error: 'invalid credantials'
          }]
        });
      }

      const opts = {
        expiresIn: serverConfig.jwt.expiresIn,
        issuer: serverConfig.jwt.issuer,
        audience: serverConfig.jwt.audience
      };

      // all is well, return successful user
      const token = jwt.sign({
        email: user.email,
        role: user.role,
        sub: 'authentication'
      }, serverConfig.secret, opts);

      return res.json({
        error: false,
        token,
        user: _.omit(user._doc, ['password', '__v', '_id'])
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        message: [{
          error: err
        }]
      });
    });
}

/**
 * Rest user password
 * @param req
 * @param res
 */
export function resetPassword(req, res) {

  if (req.user.role !== 'admin') {
    if (req.user.slug !== req.params.slug) {
      return res.status(401).json({
        error: true,
        message: [{
          error: 'unauthorized'
        }]
      });
    }
    if (!req.body.oldPassword) {
      return res.status(422).json({
        error: true,
        message: [{
          field: 'oldPassword',
          value: '',
          error: 'invalid credantials'
        }]
      })
    }
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: errors.array()
    });
  }

  User.findOne({ slug: req.params.slug })
    .then((user) => {
      const data = user;
      if (!user) {
        return res.status(404).json({
          error: true,
          message: [{
            error: 'not an endpoint'
          }]
        });
      }
      data.password = req.body.password;
      return data.save();
    })
    .then(() => {
      return res.json({
        error: false,
        message: 'password updated'
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        message: [{
          error: err
        }]
      });
    });
}
