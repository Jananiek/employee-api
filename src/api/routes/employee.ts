import { Router, Request, Response } from 'express';
import { validate } from 'class-validator';
import { EmployeeService } from '../modules/employee/services';
import { Employees } from '../../typeorm/entities/Employee';

import logger, { modules } from '../../loaders/logger/index';
import { ErrorResponse, SuccessResponse } from '../../utils/responseHandler';
import { DEFAULT_VALIDATION_OPTIONS } from '../../utils/constants/common';
const route = Router();
const employeeService = new EmployeeService();

export default (app: Router): void => {
  app.use('/employee', route);

  route.post('/', async (req: Request, res: Response) => {
    const image = req.body?.profile_picture ? req.body?.profile_picture : null;
    const formattedImage = image.trim().split(',');
    const employee = Object.assign(new Employees(), { ...req.body, profile_picture: formattedImage[1] });
    const errors = await validate(employee, DEFAULT_VALIDATION_OPTIONS);
    if (errors.length > 0) {
      logger.error('Validation Errors: ', errors);
      return ErrorResponse(res, { message: 'Validation failed!' });
    }
    try {
      const result = await employeeService.createOne(employee);
      return SuccessResponse(res, result, null, 201);
    } catch (e) {
      logger.error('Create Employee', {
        module: modules.employee,
        service: 'employee',
        data: e.message,
      });
      return ErrorResponse(res, { message: e.message });
    }
  });

  route.get('/:email', async (req: Request, res: Response) => {
    const email = req.params.email ? String(req.params.email) : undefined;
    if (!email) {
      return ErrorResponse(res, { message: 'Missing employee email' });
    }
    try {
      const result = await employeeService.getOne(email);
      return SuccessResponse(res, result, null, 200);
    } catch (e) {
      logger.error('Get employee details by email', {
        module: modules.employee,
        service: 'employee',
        data: e.message,
      });
      return ErrorResponse(res, { message: e.message });
    }
  });
};
