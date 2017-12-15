import validationResult from '../utils/validationResult';
import User from '../models/user';
import serverConfig from '../config/constants';

/**
 * Get all users
 * @param req
 * @param res
 */
export function get(req, res) {
  User.find().select('-password -__v -_id')
    .then((users) => {
      return res.json({
        error: false,
        users
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
 * Get user by slug
 * @param req
 * @param res
 */
export function show(req, res) {
  User.findOne({ slug: req.params.slug }).select('-password -__v -_id')
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: true,
          message: [{
            error: res.__('not an endpoint')
          }]
        });
      }
      return res.json({
        error: false,
        user
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
 * Create new user
 * @param req
 * @param res
 */
export function create(req, res) {
  // Data validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: errors.array()
    });
  }

  const user = new User(req.body);
  user.password = req.body.password || serverConfig.defaultPassword;

  user.save()
    .then((saved) => {
      return res.json({
        error: false,
        user: saved
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
 * Update existing user
 * @param req
 * @param res
 */
export function update(req, res) {
  // Data validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: errors.array()
    });
  }

  const userData = req.body;

  User.findOne({ slug: req.params.slug })
    .then((user) => {
      const data = user;
      for (const field in userData) { // eslint-disable-line no-restricted-syntax
        if (userData.hasOwnProperty(field)) {
          if (!!userData[field]) {
            data[field] = userData[field];
          }
        }
      }

      return data.save();
    })
    .then((saved) => {
      return res.json({
        error: false,
        user: saved
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
 * Delete user
 * @param req
 * @param res
 */
export function destroy(req, res) {
  User.findOne({ slug: req.params.slug })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: true,
          message: [{
            error: res.__('not an endpoint')
          }]
        });
      }
      return user.remove();
    })
    .then(() => {
      return res.json({
        error: false,
        message: res.__('user deleted')
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

