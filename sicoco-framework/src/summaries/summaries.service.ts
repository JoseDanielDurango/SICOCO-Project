import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Summary, SummaryDocument } from './schemas/summary.schema.js';
import { CreateSummaryDto } from './dto/create-summary.dto.js';
import { UpdateSummaryDto } from './dto/update-summary.dto.js';
import { GenerateSummaryDto } from './dto/generate-summary.dto.js';

@Injectable()
export class SummariesService {
  constructor(
    @InjectModel(Summary.name)
    private readonly summaryModel: Model<SummaryDocument>,
  ) {}

  async create(createSummaryDto: CreateSummaryDto): Promise<Summary> {
    const jobId =
      createSummaryDto.jobId ??
      `job_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const created = new this.summaryModel({
      ...createSummaryDto,
      jobId,
    });
    return created.save();
  }

  async findAll(sessionId?: string): Promise<Summary[]> {
    const query = sessionId ? { sessionId } : {};
    return this.summaryModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Summary> {
    const summary = await this.summaryModel.findById(id).exec();
    if (!summary) {
      throw new NotFoundException(`Summary with id ${id} not found`);
    }
    return summary;
  }

  async findByJobId(jobId: string): Promise<Summary> {
    const summary = await this.summaryModel.findOne({ jobId }).exec();
    if (!summary) {
      throw new NotFoundException(`Summary job with id ${jobId} not found`);
    }
    return summary;
  }

  async generate(generateDto: GenerateSummaryDto): Promise<Summary> {
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const summary = new this.summaryModel({
      sessionId: generateDto.sessionId,
      jobId,
      status: 'completed',
      style: generateDto.style ?? 'Formal',
      aiModelUsed: 'gemini-1.5-flash',
      tokenUsage: 1420,
      rawPlainText: 'Síntesis automática generada según la metodología MODESEC.',
      agreements: [
        {
          solutionDescription: 'Consenso sobre adopción de NestJS y persistencia híbrida MongoDB',
          importanceLevel: 'High',
          proposedByAlias: 'Jose_D',
        },
        {
          solutionDescription: 'Aprobación del formato de validación técnica U1-01',
          importanceLevel: 'High',
          proposedByAlias: 'Jefersson_R',
        },
      ],
      disagreements: [
        {
          debateTopic: 'Elección de motor de testing Jest vs Vitest',
          oppositionDescription: 'Debate sobre rendimiento en ES Modules nativos',
          resolutionStatus: 'Resolved',
        },
      ],
      doubts: [
        {
          mainQuestion: '¿Cómo integrar el streaming de respuestas con la extensión Chromium?',
          relatedTopic: 'Integración Frontend',
          resolved: false,
        },
      ],
      tasks: [
        {
          activityTitle: 'Construir controladores y servicios en sicoco-framework',
          assignedToAlias: 'Jose_D',
          status: 'Completed',
          dueDate: new Date(Date.now() + 86400000 * 3),
        },
        {
          activityTitle: 'Actualizar informe de requerimientos y documentación',
          assignedToAlias: 'Jesus_R',
          status: 'Pending',
          dueDate: new Date(Date.now() + 86400000 * 5),
        },
      ],
      timeline: [
        {
          timestamp: new Date(),
          userAlias: 'Jose_D',
          event: 'Propuesta de arquitectura técnica y persistencia',
          connectedIdeaIds: ['idea_01'],
        },
        {
          timestamp: new Date(),
          userAlias: 'Jeyson_L',
          event: 'Acuerdo grupal sobre cuatro pilares MODESEC',
          connectedIdeaIds: ['idea_01', 'idea_02'],
        },
      ],
    });
    return summary.save();
  }

  async update(id: string, updateSummaryDto: UpdateSummaryDto): Promise<Summary> {
    const updated = await this.summaryModel
      .findByIdAndUpdate(id, updateSummaryDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Summary with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.summaryModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Summary with id ${id} not found`);
    }
    return { deleted: true };
  }
}
