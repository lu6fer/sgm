import { validationResult } from 'express-validator/check';

export default (req, res) => (
  validationResult(req).formatWith((error) => ({
    field: error.param,
    value: error.value,
    error: res.__(error.msg)
  }))
);
