// src/controllers/profile.controller.ts
import { Controller, Post, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { ProfileService } from 'src/services/profile.service';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post('create')
  async createProfile(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    const userId = req.user.userId; // Assumes `userId` is available from JWT payload
    return this.profileService.createOrUpdateProfile(userId, createProfileDto);
  }
}
