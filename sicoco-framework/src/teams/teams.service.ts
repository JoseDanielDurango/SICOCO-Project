import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema.js';
import { CreateTeamDto, TeamMemberDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const created = new this.teamModel(createTeamDto);
    return created.save();
  }

  async findAll(courseId?: string): Promise<Team[]> {
    const query = courseId ? { courseId } : {};
    return this.teamModel.find(query).exec();
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamModel.findById(id).exec();
    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return team;
  }

  async approveTeam(id: string, approved: boolean = true): Promise<Team> {
    const team = await this.findOne(id);
    team.requiresTeacherApproval = false;
    team.isActive = approved;
    return this.teamModel
      .findByIdAndUpdate(
        id,
        { requiresTeacherApproval: false, isActive: approved },
        { new: true },
      )
      .exec() as Promise<Team>;
  }

  async getTeamMetrics(id: string): Promise<{
    teamId: string;
    name: string;
    memberCount: number;
    rolesDistribution: Record<string, number>;
    isActive: boolean;
    requiresTeacherApproval: boolean;
  }> {
    const team = await this.findOne(id);
    const rolesDistribution: Record<string, number> = {};

    for (const m of team.members || []) {
      const role = m.role || 'Member';
      rolesDistribution[role] = (rolesDistribution[role] || 0) + 1;
    }

    return {
      teamId: id,
      name: team.name,
      memberCount: (team.members || []).length,
      rolesDistribution,
      isActive: team.isActive,
      requiresTeacherApproval: team.requiresTeacherApproval,
    };
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const updated = await this.teamModel
      .findByIdAndUpdate(id, updateTeamDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return updated;
  }

  async addMember(id: string, memberDto: TeamMemberDto): Promise<Team> {
    const team = await this.findOne(id);
    const existingIndex = team.members.findIndex(
      (m) => m.studentId === memberDto.studentId,
    );
    if (existingIndex >= 0) {
      team.members[existingIndex].role = memberDto.role ?? team.members[existingIndex].role;
      if (memberDto.name) team.members[existingIndex].name = memberDto.name;
    } else {
      team.members.push({
        studentId: memberDto.studentId,
        name: memberDto.name,
        role: memberDto.role ?? 'Member',
        joinedAt: new Date(),
      });
    }
    return this.teamModel
      .findByIdAndUpdate(id, { members: team.members }, { new: true })
      .exec() as Promise<Team>;
  }

  async removeMember(id: string, studentId: string): Promise<Team> {
    const team = await this.findOne(id);
    const filtered = team.members.filter((m) => m.studentId !== studentId);
    return this.teamModel
      .findByIdAndUpdate(id, { members: filtered }, { new: true })
      .exec() as Promise<Team>;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.teamModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return { deleted: true };
  }
}
