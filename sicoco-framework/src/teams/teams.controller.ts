import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TeamsService } from './teams.service.js';
import { CreateTeamDto, TeamMemberDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all teams (optionally filter by courseId)' })
  @ApiQuery({ name: 'courseId', required: false })
  findAll(@Query('courseId') courseId?: string) {
    return this.teamsService.findAll(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve team details by ID' })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update team details' })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Post(':id/members')
  @ApiOperation({ summary: 'Add or update a member in the team' })
  addMember(@Param('id') id: string, @Body() memberDto: TeamMemberDto) {
    return this.teamsService.addMember(id, memberDto);
  }

  @Delete(':id/members/:studentId')
  @ApiOperation({ summary: 'Remove a member from the team' })
  removeMember(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
  ) {
    return this.teamsService.removeMember(id, studentId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team' })
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
