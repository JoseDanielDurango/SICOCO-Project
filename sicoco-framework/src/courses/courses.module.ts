import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './courses.service.js';
import { CoursesController } from './courses.controller.js';
import { Course, CourseSchema } from './schemas/course.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
