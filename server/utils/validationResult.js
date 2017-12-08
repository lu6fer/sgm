import { validationResult } from 'express-validator/check';

export default (req) => (
  validationResult(req).formatWith((error) => ({
    field: error.param,
    value: error.value,
    error: error.msg
  }))
)
