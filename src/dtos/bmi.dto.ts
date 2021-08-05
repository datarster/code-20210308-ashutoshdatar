import { GenderEnum } from '@enums/gender.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class BMIDto {
  @IsString()
  @IsEnum(GenderEnum)
  public gender: string;

  @IsNumber()
  public heightCM: number;

  @IsNumber()
  public weightKG: number;

  @IsString()
  @IsOptional()
  public bmiCategory?: string;

  @IsNumber()
  @IsOptional()
  public bmi?: number;

  @IsString()
  @IsOptional()
  public healthRisk?: string;
}
