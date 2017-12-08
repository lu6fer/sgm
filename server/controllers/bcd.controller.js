import validationResult from '../utils/validationResult';
import Bcd from '../models/bcd';

/**
 * Get all BCDs
 * @param req
 * @param res
 */
export function get(req, res) {
  Bcd.find()
    .then((bcds) => {
      return res.json({
        error: false,
        bcds
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
 * Display BCD by it's number
 * @param req
 * @param res
 */
export function show(req, res) {
  Bcd.findOne({ number: req.params.number })
    .then((bcd) => {
      if (!bcd) {
        return res.status(404).json({
          error: true,
          message: [{
            error: 'not an endpoint'
          }]
        });
      }
      return res.json({
        error: false,
        bcd
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
 * Create new BCD
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

  const bcd = new Bcd(req.body);

  Bcd.findOne({}, ['number'], { sort: { number: -1 } })
    .then((max) => {
      if (!bcd.number) {
        if (max && max.number) {
          bcd.number = max.number + 1;
        } else {
          bcd.number = 1;
        }
      }
      return bcd.save();
    })
    .then((saved) => {
      return res.json({
        error: false,
        bcd: saved
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        message: err
      });
    });
}

/**
 * Update existing BCD
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

  const bcdData = req.body;

  Bcd.findOne({ number: req.params.number })
    .then((bcd) => {
      const data = bcd;
      for (const field in bcdData) {
        if (bcdData.hasOwnProperty(field)) {
          if (!!bcdData[field]) {
            data[field] = bcdData[field];
          }
        }
      }
      return data.save();
    })
    .then((saved) => {
      return res.json({
        error: false,
        bcd: saved
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
 * Delete BCD
 * @param req
 * @param res
 */
export function destroy(req, res) {
  Bcd.findOne({ number: req.params.number })
    .then((bcd) => {
      if (!bcd) {
        return res.status(404).json({
          error: true,
          message: 'not an endpoint'
        });
      }
      return bcd.remove();
    })
    .then(() => {
      return res.json({
        error: false,
        message: 'bcd deleted'
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
