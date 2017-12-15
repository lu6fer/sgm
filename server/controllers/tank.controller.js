import validationResult from '../utils/validationResult';
import Tank from '../models/tank';

/**
 * Get all Tanks
 * @param req
 * @param res
 */
export function get(req, res) {
  Tank.find()
    .then((tanks) => {
      return res.json({
        error: false,
        tanks
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
 * Display Tank by it's number
 * @param req
 * @param res
 */
export function show(req, res) {
  Tank.findOne({ number: req.params.number })
    .then((tank) => {
      if (!tank) {
        return res.status(404).json({
          error: true,
          message: [{
            error: res.__('not an endpoint')
          }]
        });
      }
      return res.json({
        error: false,
        tank
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
 * Create new Tank
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

  const tank = new Tank(req.body);

  Tank.findOne({}, ['number'], { sort: { number: -1 } })
    .then((max) => {
      if (!tank.number) {
        if (max && max.number) {
          tank.number = max.number + 1;
        } else {
          tank.number = 1;
        }
      }
      return tank.save();
    })
    .then((saved) => {
      return res.json({
        error: false,
        tank: saved
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
 * Update existing Tank
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

  const tankData = req.body;

  Tank.findOne({ number: req.param.number })
    .then((tank) => {
      const data = tank;
      for (const field in tankData) {
        if (tankData.hasOwnProperty(field)) {
          if (!!tankData[field]) {
            data[field] = tankData[field];
          }
        }
      }

      return data.save();
    })
    .then((saved) => {
      return res.json({
        error: false,
        tank: saved
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
 * Delete Tank
 * @param req
 * @param res
 */
export function destroy(req, res) {
  Tank.findOne({ number: req.params.number })
    .then((tank) => {
      if (!tank) {
        return res.status(404).json({
          error: true,
          message: [{
            error: res.__('not an endpoint')
          }]
        });
      }
      return tank.remove();
    })
    .then(() => {
      return res.json({
        error: false,
        message: res.__('tank deleted')
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
