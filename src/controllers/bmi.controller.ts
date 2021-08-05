import { BMIDto } from '@/dtos/bmi.dto';
import BMICalculatorService from '@/services/bmi.calculator.service';
import { calculateOverweightPeople } from '@/utils/util';
import { NextFunction, Request, Response } from 'express';

class BMIController {
  public bmiCalculatorService = new BMICalculatorService();

  public calculateBMI = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let bmiDtos: BMIDto[] = [];
      let noOfOverWeightPeople = 0;
      await this.bmiCalculatorService.calculateBMI(req.body).then(result => {
        bmiDtos = result;
        noOfOverWeightPeople = calculateOverweightPeople(bmiDtos);
      });
      res.status(201).json({ noOfOverWeightPeople: noOfOverWeightPeople, data: bmiDtos });
    } catch (error) {
      next(error);
    }
  };
}

export default BMIController;
