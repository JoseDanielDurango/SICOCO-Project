import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Course, CourseDocument } from './schemas/course.schema.js';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(semester?: string, isActive?: boolean): Promise<Course[]> {
    const query: Record<string, any> = {};
    if (semester) {
      query.academicSemester = semester;
    }
    if (isActive !== undefined) {
      query.isActive = isActive;
    }
    return this.courseModel.find(query).exec();
  }

  async findByCode(code: string): Promise<Course> {
    const course = await this.courseModel.findOne({ code }).exec();
    if (!course) {
      throw new NotFoundException(`Course with code ${code} not found`);
    }
    return course;
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async toggleActive(id: string): Promise<Course> {
    const course = await this.findOne(id);
    course.isActive = !course.isActive;
    return this.courseModel
      .findByIdAndUpdate(id, { isActive: course.isActive }, { new: true })
      .exec() as Promise<Course>;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  async remove(id: string): Promise<Course> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return deletedCourse;
  }
}
