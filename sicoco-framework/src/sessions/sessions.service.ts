import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './schemas/session.schema.js';
import { CreateSessionDto } from './dto/create-session.dto.js';
import { UpdateSessionDto } from './dto/update-session.dto.js';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const created = new this.sessionModel(createSessionDto);
    return created.save();
  }

  async findAll(teamId?: string): Promise<Session[]> {
    const query = teamId ? { teamId } : {};
    return this.sessionModel.find(query).sort({ meetingDate: -1 }).exec();
  }

  async findOne(id: string): Promise<Session> {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }
    return session;
  }

  async updateStatus(id: string, status: string): Promise<Session> {
    const validStatuses = ['Planned', 'Active', 'Completed', 'Archived'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}`,
      );
    }
    const session = await this.sessionModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }
    return session;
  }

  async getSessionPacket(id: string): Promise<{
    session: Session;
    durationMinutes: number;
    status: string;
    isReadyForSynthesis: boolean;
  }> {
    const session = await this.findOne(id);
    return {
      session,
      durationMinutes: session.estimatedDurationMinutes || 60,
      status: session.status,
      isReadyForSynthesis: session.status === 'Completed' || session.status === 'Active',
    };
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const updated = await this.sessionModel
      .findByIdAndUpdate(id, updateSessionDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }
    return { deleted: true };
  }
}
