import { BMIDto } from '@/dtos/bmi.dto';
import { BMICategoryEnum } from '@/enums/bmi.category.enum';
import { HealthRiskEnum } from '@/enums/health-risk.enum';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const convertCentimeterToMeter = (heightInCM: number): number => {
  return heightInCM / 100;
};

export const calculateBMI = (weightInKG: number, heightInMeter: number): number => {
  return Math.round((weightInKG / (heightInMeter * heightInMeter)) * 100) / 100;
};

export const getBMICategory = (bmiIndex: number): string => {
  if (bmiIndex <= 18.4) {
    return BMICategoryEnum.UNDERWEIGHT;
  } else if (bmiIndex >= 18.5 && bmiIndex <= 24.9) {
    return BMICategoryEnum.NORMAL_WEIGHT;
  } else if (bmiIndex >= 25.0 && bmiIndex <= 29.9) {
    return BMICategoryEnum.OVERWEIGHT;
  } else if (bmiIndex >= 30.0 && bmiIndex <= 34.9) {
    return BMICategoryEnum.MODERATELY_OBESE;
  } else if (bmiIndex >= 35.0 && bmiIndex <= 39.9) {
    return BMICategoryEnum.SEVERELY_OBESE;
  } else if (bmiIndex >= 40) {
    return BMICategoryEnum.VERY_SEVERELY_OBESE;
  }
};

export const getHealthRisk = (bmiIndex: number): string => {
  if (bmiIndex <= 18.4) {
    return HealthRiskEnum.MALNUTRITION_RISK;
  } else if (bmiIndex >= 18.5 && bmiIndex <= 24.9) {
    return HealthRiskEnum.LOW_RISK;
  } else if (bmiIndex >= 25.0 && bmiIndex <= 29.9) {
    return HealthRiskEnum.ENHANCED_RISK;
  } else if (bmiIndex >= 30.0 && bmiIndex <= 34.9) {
    return HealthRiskEnum.MEDIUM_RISK;
  } else if (bmiIndex >= 35.0 && bmiIndex <= 39.9) {
    return HealthRiskEnum.HIGH_RISK;
  } else if (bmiIndex >= 40) {
    return HealthRiskEnum.VERY_HIGH_RISK;
  }
};

export const calculateOverweightPeople = (bmiDtos: BMIDto[]): number => {
  let count = 0;
  bmiDtos.forEach(item => {
    if (item.bmiCategory === BMICategoryEnum.OVERWEIGHT) count++;
  });
  return count;
};
