import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import BMIController from '@/controllers/bmi.controller';
import { BMIBulkDto } from '@/dtos/calculateBMI.dto';

class BMIRoute implements Routes {
  public path = '/bmi';
  public router = Router();
  public BMIController = new BMIController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(BMIBulkDto, 'body'), this.BMIController.calculateBMI);
  }
}

export default BMIRoute;
