import validationResult from '../utils/validationResult';
import Regulator from '../models/regulator';

/**
 * Get all Regulators
 * @param req
 * @param res
 */
export function get(req, res) {
  Regulator.find()
    .then((regulators) => {
      return res.json({
        error: false,
        regulators
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
 * Display Regulator by it's number
 * @param req
 * @param res
 */
export function show(req, res) {
  Regulator.findOne({ number: req.params.number })
    .then((regulator) => {
      if (!regulator) {
        return res.status(404).json({
          error: true,
          message: [{
            error: 'not an endpoint'
          }]
        });
      }

      return res.json({
        error: false,
        regulator
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
 * Create new Regulator
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

  const regulator = new Regulator(req.body);

  Regulator.findOne({}, ['number'], { sort: { number: -1 } })
    .then((max) => {
      if (!regulator.number) {
        if (max && max.number) {
          regulator.number = max.number + 1;
        } else {
          regulator.number = 1;
        }
      }
      return regulator.save();
    })
    .then((saved) => {
      return res.json({
        error: false,
        regulator: saved
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
 * Update existing Regulator
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

  const regulatorData = req.body;

  Regulator.findOne({ number: req.params.number })
    .then((regulator) => {
      const data = regulator;
      for (const field in regulatorData) {
        if (regulatorData.hasOwnProperty(field)) {
          if (!!regulatorData[field]) {
            data[field] = regulatorData[field];
          }
        }
      }
      return data.save();
    })
    .then((saved) => {
      return res.json({
        error: false,
        regulator: saved
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
 * Delete Regulator
 * @param req
 * @param res
 */
export function destroy(req, res) {
  Regulator.findOne({ number: req.params.number })
    .then((regulator) => {
      if (!regulator) {
        return res.status(404).json({
          error: true,
          message: [{
            error: 'not an endpoint'
          }]
        });
      }
      return regulator.remove();
    })
    .then(() => {
      return res.json({
        error: false,
        message: 'regulator deleted'
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
