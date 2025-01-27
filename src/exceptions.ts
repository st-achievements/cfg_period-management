import { exception } from '@st-api/core';
import { StatusCodes } from 'http-status-codes';

export const PERIOD_NOT_FOUND = exception({
  status: StatusCodes.NOT_FOUND,
  message: 'Period not found',
  error: 'Period not found',
  errorCode: 'CFG-PERIOD-0001',
});
