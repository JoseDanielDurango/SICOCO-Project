import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { Roles } from './decorators/roles.decorator.js';
import { CurrentUser } from './decorators/current-user.decorator.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user with hashed password and initial role' })
  @ApiResponse({ status: 201, description: 'User successfully registered with JWT token' })
  @ApiResponse({ status: 400, description: 'Validation error or email already in use' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user credentials and receive JWT access token' })
  @ApiResponse({ status: 200, description: 'Successful login returning JWT access token' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile from JWT' })
  @ApiResponse({ status: 200, description: 'Authenticated user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized request or invalid token' })
  async getProfile(@CurrentUser('sub') userId: string) {
    return this.authService.getProfile(userId);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change current user password after verifying current credentials' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid current password or weak new password' })
  @ApiResponse({ status: 401, description: 'Unauthorized request' })
  async changePassword(
    @CurrentUser('sub') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @Get('student-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'RBAC verification endpoint for student and admin profiles' })
  @ApiResponse({ status: 200, description: 'Access granted to student workspace' })
  @ApiResponse({ status: 403, description: 'Forbidden resource for current user role' })
  async studentOnlyResource(@CurrentUser() user: any) {
    return {
      message: 'Access granted to student collaborative workspace',
      user,
    };
  }

  @Get('teacher-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'RBAC verification endpoint for teacher and admin profiles' })
  @ApiResponse({ status: 200, description: 'Access granted to teacher resource' })
  @ApiResponse({ status: 403, description: 'Forbidden resource for current user role' })
  async teacherOnlyResource(@CurrentUser() user: any) {
    return {
      message: 'Access granted to teacher and evaluation control zone',
      user,
    };
  }

  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'RBAC verification endpoint exclusively for system administrators' })
  @ApiResponse({ status: 200, description: 'Access granted to administrative governance zone' })
  @ApiResponse({ status: 403, description: 'Forbidden resource for non-admin roles' })
  async adminOnlyResource(@CurrentUser() user: any) {
    return {
      message: 'Access granted to system administrative governance zone',
      user,
    };
  }
}
