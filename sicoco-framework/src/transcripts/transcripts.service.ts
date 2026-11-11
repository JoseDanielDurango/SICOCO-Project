import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transcript, TranscriptDocument } from './schemas/transcript.schema.js';
import { CreateTranscriptDto, ChatMessageDto } from './dto/create-transcript.dto.js';
import { UpdateTranscriptDto } from './dto/update-transcript.dto.js';

@Injectable()
export class TranscriptsService {
  constructor(
    @InjectModel(Transcript.name)
    private readonly transcriptModel: Model<TranscriptDocument>,
  ) {}

  async create(createTranscriptDto: CreateTranscriptDto): Promise<Transcript> {
    const dataSize = createTranscriptDto.messages.reduce(
      (acc, m) => acc + (m.content ? m.content.length : 0),
      0,
    );
    const created = new this.transcriptModel({
      ...createTranscriptDto,
      dataSize,
    });
    return created.save();
  }

  async findAll(sessionId?: string): Promise<Transcript[]> {
    const query = sessionId ? { sessionId } : {};
    return this.transcriptModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Transcript> {
    const transcript = await this.transcriptModel.findById(id).exec();
    if (!transcript) {
      throw new NotFoundException(`Transcript with id ${id} not found`);
    }
    return transcript;
  }

  async appendMessages(
    id: string,
    newMessages: ChatMessageDto[],
  ): Promise<Transcript> {
    const transcript = await this.findOne(id);
    const startIndex = transcript.messages.length;
    const mapped = newMessages.map((m, idx) => ({
      senderAlias: m.senderAlias,
      content: m.content,
      timestamp: m.timestamp ?? new Date(),
      sequenceNumber: startIndex + idx + 1,
    }));
    transcript.messages.push(...mapped);
    const additionalSize = newMessages.reduce(
      (acc, m) => acc + (m.content ? m.content.length : 0),
      0,
    );
    const newSize = (transcript.dataSize || 0) + additionalSize;

    return this.transcriptModel
      .findByIdAndUpdate(
        id,
        { messages: transcript.messages, dataSize: newSize },
        { new: true },
      )
      .exec() as Promise<Transcript>;
  }

  async update(
    id: string,
    updateTranscriptDto: UpdateTranscriptDto,
  ): Promise<Transcript> {
    const updated = await this.transcriptModel
      .findByIdAndUpdate(id, updateTranscriptDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Transcript with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.transcriptModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Transcript with id ${id} not found`);
    }
    return { deleted: true };
  }
}
