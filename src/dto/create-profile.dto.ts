// src/dto/create-profile.dto.ts
import { IsString, IsDate, IsEnum, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  fullname: string;

  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @IsDate()
  birthday: Date;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  interest: string[];
}
