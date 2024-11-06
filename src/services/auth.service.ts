// auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, confirmPassword } = createUserDto;

    if (!email) {
      throw new BadRequestException("Email is required");
    }

    if (!username) {
      throw new BadRequestException("Username is required");
    }

    if (!password || !confirmPassword) {
      throw new BadRequestException("Password is required");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    // Check if the email or username already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new BadRequestException('Email or username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const returnedUser = new this.userModel({
      email,
      username
    });
    
    return returnedUser;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid users');
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { userId: user._id, username: user.username };
    const token =  this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Optionally, store the refresh token in the database for user
    user.refreshToken = refreshToken;
    await user.save();

    // Return token and user data (excluding password)
    const { password: _, refreshToken: __, ...userWithoutSensitiveInfo } = user.toObject();
    return { token, refreshToken, user: userWithoutSensitiveInfo };
  }
}
