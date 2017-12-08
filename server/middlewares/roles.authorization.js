import User from '../models/user';

const roleAuthorization = (roles) => (
  (req, res, next) => {
    const user = req.user;
    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({
          error: true,
          message: 'User not found'
        });
        return next(err);
      }

      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }

      res.status(401).json({
        error: true,
        message: 'Your are not authorized to view this content'
      });

      return next('Unauthorized');
    });
  }
);

export default roleAuthorization;
