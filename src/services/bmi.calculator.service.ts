import { BMIDto } from '@/dtos/bmi.dto';
import { calculateBMI, convertCentimeterToMeter, getBMICategory, getHealthRisk } from '@/utils/util';

class BMICalculatorService {
  public async calculateBMI(bmiDtos: BMIDto[]): Promise<BMIDto[]> {
    for (let i = 0; i < bmiDtos.length; i++) {
      // convert height cm to meter
      const bmiDto: BMIDto = bmiDtos[i];
      const heightInMeter: number = convertCentimeterToMeter(bmiDto.heightCM);
      bmiDto.bmi = calculateBMI(bmiDto.weightKG, heightInMeter);
      bmiDto.bmiCategory = getBMICategory(bmiDto.bmi);
      bmiDto.healthRisk = getHealthRisk(bmiDto.bmi);
    }
    return bmiDtos;
  }
}

export default BMICalculatorService;
