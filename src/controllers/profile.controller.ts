// src/controllers/profile.controller.ts
import { Controller, Post, Body, Req, UseGuards, HttpCode, Get } from '@nestjs/common';
import { ProfileService } from 'src/services/profile.service';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Profile } from 'src/schemas/profile.schema';

@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post('createProfile')
  async createProfile(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    const userId = req.user._id; // Assumes `user._id` is available from JWT payload
    return this.profileService.createOrUpdateProfile(userId, createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('updateProfile')
  async updateProfile(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    const userId = req.user._id; // Assumes `user._id` is available from JWT payload
    return this.profileService.createOrUpdateProfile(userId, createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('getProfile')
  async getProfile(@Req() req) {
    const userId = req.user._id; // Assumes `user._id` is available from JWT payload
    return this.profileService.getProfile(userId); // Fetch the profile from the service
  }
}
