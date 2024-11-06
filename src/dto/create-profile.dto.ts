// src/dto/create-profile.dto.ts
import { IsString, IsDate, IsEnum, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  displayName: string;

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
