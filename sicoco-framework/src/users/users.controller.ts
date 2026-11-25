import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('stats/overview')
  @ApiOperation({ summary: 'Retrieve global user demographic and role statistics' })
  getStats() {
    return this.usersService.getStudentStats();
  }

  @Get('role/:role')
  @ApiOperation({ summary: 'Retrieve users filtered by role (student, teacher, admin)' })
  @ApiParam({ name: 'role', enum: ['student', 'teacher', 'admin'] })
  findByRole(@Param('role') role: string) {
    return this.usersService.findByRole(role);
  }

  @Get('enrollment/:enrollmentNumber')
  @ApiOperation({ summary: 'Retrieve student details by institutional enrollment number' })
  findByEnrollment(@Param('enrollmentNumber') enrollmentNumber: string) {
    return this.usersService.findByEnrollmentNumber(enrollmentNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve user details by MongoDB ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user attributes' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
