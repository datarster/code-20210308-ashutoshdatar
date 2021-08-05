import request from 'supertest';
import App from '@/app';
import BMIRoute from '@/routes/bmi.route';
import { BMIDto } from '@/dtos/bmi.dto';

const preDefinedMultiUserData: BMIDto[] = [
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
];

const preDefinedSingleUserData: BMIDto[] = [
  {
    gender: 'Male',
    heightCM: 171,
    weightKG: 96,
  },
];

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing BMI Calculation', () => {
  describe('[POST] /bmi', () => {
    it('response statusCode 201 / created', async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      return request(app.getServer()).post(`${bmiRoute.path}`).send(preDefinedMultiUserData).expect(201);
    });
  });

  describe('[POST] /bmi', () => {
    it('should match the BMIndex with 32.8', async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(preDefinedSingleUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmi).toBe(32.8);
        });
    });
  });

  describe('[POST] /bmi', () => {
    it('should match the noOfOverWeightPeople to 0', async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(preDefinedSingleUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.noOfOverWeightPeople).toBe(1);
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("should match the BMI Category to 'moderatery obese'", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(preDefinedSingleUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('moderatery obese');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("should match the Health Risk to 'medium risk'", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(preDefinedSingleUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].healthRisk).toBe('medium risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it('should match the noOfOverWeightPeople to 2', async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(preDefinedMultiUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.noOfOverWeightPeople).toBe(2);
        });
    });
  });
});

describe('Testing BMI Calculation with edge cases', () => {
  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '11.7', BMI Category should be 'underweight' and Health Risks is 'malnutrition risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const underWeightUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 160,
          weightKG: 30,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(underWeightUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('underweight');
          expect(res.body.data[0].healthRisk).toBe('malnutrition risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '18.5', BMI Category should be 'normal weight' and Health Risks is 'low' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const normalWeightUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 171,
          weightKG: 54,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(normalWeightUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('normal weight');
          expect(res.body.data[0].healthRisk).toBe('low risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '24.9', BMI Category should be 'normal weight' and Health Risks is 'low' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const normalWeightUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 171,
          weightKG: 72.7,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(normalWeightUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('normal weight');
          expect(res.body.data[0].healthRisk).toBe('low risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '25.0', BMI Category should be 'overweight' and Health Risks is 'enhanced risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const overWeightUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 181,
          weightKG: 82,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(overWeightUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('overweight');
          expect(res.body.data[0].healthRisk).toBe('enhanced risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '29.9', BMI Category should be 'overweight' and Health Risks is 'enhanced risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const overWeightUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 220,
          weightKG: 144.5,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(overWeightUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('overweight');
          expect(res.body.data[0].healthRisk).toBe('enhanced risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '30.0', BMI Category should be 'moderatery obese' and Health Risks is 'medium risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const moderateWeightUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 220,
          weightKG: 145,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(moderateWeightUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('moderatery obese');
          expect(res.body.data[0].healthRisk).toBe('medium risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '34.9', BMI Category should be 'moderatery obese' and Health Risks is 'medium risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const moderateWeightUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 140,
          weightKG: 68.5,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(moderateWeightUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('moderatery obese');
          expect(res.body.data[0].healthRisk).toBe('medium risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '35.0', BMI Category should be 'severely obese' and Health Risks is 'high risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const severelyObeseUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 140,
          weightKG: 68.6,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(severelyObeseUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('severely obese');
          expect(res.body.data[0].healthRisk).toBe('high risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '39.9', BMI Category should be 'severely obese' and Health Risks is 'high risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const severelyObeseUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 130,
          weightKG: 67.5,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(severelyObeseUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('severely obese');
          expect(res.body.data[0].healthRisk).toBe('high risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '40.0', BMI Category should be 'very severely obese' and Health Risks is 'very high risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const verySeverelyObeseUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 150,
          weightKG: 90,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(verySeverelyObeseUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('very severely obese');
          expect(res.body.data[0].healthRisk).toBe('very high risk');
        });
    });
  });

  describe('[POST] /bmi', () => {
    it("Edge case - With BMI Value of '45.9', BMI Category should be 'very severely obese' and Health Risks is 'very high risk' ", async () => {
      const bmiRoute = new BMIRoute();
      const app = new App([bmiRoute]);

      const verySeverelyObeseUserData: BMIDto[] = [
        {
          gender: 'Male',
          heightCM: 140,
          weightKG: 90,
        },
      ];

      return request(app.getServer())
        .post(`${bmiRoute.path}`)
        .send(verySeverelyObeseUserData)
        .expect(201)
        .then(res => {
          expect(res.body).toBeDefined();
          expect(res.body.data[0].bmiCategory).toBe('very severely obese');
          expect(res.body.data[0].healthRisk).toBe('very high risk');
        });
    });
  });
});
