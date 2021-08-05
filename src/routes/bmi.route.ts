import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import BMIController from '@/controllers/bmi.controller';

class BMIRoute implements Routes {
  public path = '/bmi';
  public router = Router();
  public BMIController = new BMIController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.BMIController.calculateBMI);
  }
}

export default BMIRoute;
