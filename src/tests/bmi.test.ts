import request from 'supertest';
import App from '@/app';
import BMIRoute from '@/routes/bmi.route';
import { BMIBulkDto } from '@/dtos/calculateBMI.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing BMI Calculation', () => {
  describe('[POST] /bmi', () => {
    it('response statusCode 201 / created', async () => {
      const userData: BMIBulkDto = {
        data: [
          {
            gender: 'Male',
            heightCM: 171,
            weightKG: 96,
          },
          {
            gender: 'Male',
            heightCM: 161,
            weightKG: 85,
          },
          {
            gender: 'Male',
            heightCM: 180,
            weightKG: 77,
          },
        ],
      };
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      return request(app.getServer()).post(`${bmiRoute.path}`).send(userData).expect(201);
    });
  });
});
