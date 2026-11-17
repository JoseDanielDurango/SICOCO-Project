import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.userModel.findOne({ email: registerDto.email }).exec();
    if (existing) {
      throw new BadRequestException('A user with this email is already registered');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    const createdUser = new this.userModel({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role ?? 'student',
      enrollmentNumber: registerDto.enrollmentNumber,
      academicProgram: registerDto.academicProgram ?? 'Licenciatura en Informática',
      currentSemester: registerDto.currentSemester,
    });

    const savedUser = await createdUser.save();

    const payload = {
      sub: savedUser._id.toString(),
      email: savedUser.email,
      role: savedUser.role,
      name: savedUser.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'User registered successfully',
      accessToken,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        enrollmentNumber: savedUser.enrollmentNumber,
        academicProgram: savedUser.academicProgram,
        currentSemester: savedUser.currentSemester,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password')
      .exec();

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password credentials');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrollmentNumber: user.enrollmentNumber,
        academicProgram: user.academicProgram,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Authenticated user profile not found');
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrollmentNumber: user.enrollmentNumber,
      academicProgram: user.academicProgram,
      currentSemester: user.currentSemester,
      age: user.age,
    };
  }
}
