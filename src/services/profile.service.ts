// src/services/profile.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { Profile } from 'src/schemas/profile.schema';
import { calculateHoroscope, calculateChineseZodiac } from '../utils/profile.util';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async createOrUpdateProfile(userId: Types.ObjectId, createProfileDto: CreateProfileDto): Promise<Profile> {
    const { fullname, gender, birthday, height, weight, interest } = createProfileDto;

    let birthDate: Date, horoscope: string, zodiac: string;
    if (birthday) {
      birthDate = new Date(birthday);

      // Generate horoscope and zodiac based on birthday
      horoscope = calculateHoroscope(birthDate);
      zodiac = calculateChineseZodiac(birthDate);
    }

    // Check if profile already exists
    const existingProfile = await this.profileModel.findOne({ userId });
    if (existingProfile) {
      // Update profile
      if (fullname) existingProfile.fullname = fullname;
      if (gender) existingProfile.gender = gender;
      if (birthDate) existingProfile.birthday = birthDate;
      if (horoscope) existingProfile.horoscope = horoscope;
      if (zodiac) existingProfile.zodiac = zodiac;
      if (height) existingProfile.height = height;
      if (weight) existingProfile.weight = weight;
      if (interest) existingProfile.interest = interest;

      return existingProfile.save();
    } else {
      // Create new profile
      const profile = new this.profileModel({
        userId,
        fullname,
        gender,
        birthday: birthDate,
        horoscope,
        zodiac,
        height,
        weight,
        interest,
      });
      
      return profile.save();
    }
  }

  async getProfile(userId: string) {
    // Fetch the user's profile
    return this.profileModel.findOne({ userId });
  }
}
