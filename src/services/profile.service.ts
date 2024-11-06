// src/services/profile.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { Profile } from 'src/schemas/profile.schema';
import { calculateHoroscope, calculateZodiac } from '../utils/profile.util';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async createOrUpdateProfile(userId: Types.ObjectId, createProfileDto: CreateProfileDto): Promise<Profile> {
    const { displayName, gender, birthday, height, weight, interest } = createProfileDto;

    // Generate horoscope and zodiac based on birthday
    const horoscope = calculateHoroscope(birthday);
    const zodiac = calculateZodiac(birthday);

    // Check if profile already exists
    const existingProfile = await this.profileModel.findOne({ userId });
    if (existingProfile) {
      // Update profile
      existingProfile.displayName = displayName;
      existingProfile.gender = gender;
      existingProfile.birthday = birthday;
      existingProfile.horoscope = horoscope;
      existingProfile.zodiac = zodiac;
      existingProfile.height = height;
      existingProfile.weight = weight;
      existingProfile.interest = interest;

      return existingProfile.save();
    } else {
      // Create new profile
      const profile = new this.profileModel({
        userId,
        displayName,
        gender,
        birthday,
        horoscope,
        zodiac,
        height,
        weight,
        interest,
      });
      return profile.save();
    }
  }
}
