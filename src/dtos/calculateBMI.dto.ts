import { GenderEnum } from '@enums/gender.enum';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class CalculateBMI {
  @IsString()
  @IsEnum(GenderEnum)
  public gender: string;

  @IsNumber()
  public heightCM: number;

  @IsNumber()
  public weightKG: number;
}

export class BMIBulkDto {
  @IsArray()
  data: CalculateBMI[];
}
