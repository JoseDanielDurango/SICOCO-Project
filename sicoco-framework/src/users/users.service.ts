import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User, UserDocument } from './schemas/user.schema.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  async findByEnrollmentNumber(enrollmentNumber: string): Promise<User> {
    const user = await this.userModel.findOne({ enrollmentNumber }).exec();
    if (!user) {
      throw new NotFoundException(`User with enrollment number ${enrollmentNumber} not found`);
    }
    return user;
  }

  async getStudentStats(): Promise<{
    totalUsers: number;
    byRole: Record<string, number>;
    byProgram: Record<string, number>;
  }> {
    const allUsers = await this.userModel.find().exec();
    const byRole: Record<string, number> = {};
    const byProgram: Record<string, number> = {};

    for (const u of allUsers) {
      const r = u.role || 'student';
      byRole[r] = (byRole[r] || 0) + 1;

      const p = u.academicProgram || 'General';
      byProgram[p] = (byProgram[p] || 0) + 1;
    }

    return {
      totalUsers: allUsers.length,
      byRole,
      byProgram,
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }
}
