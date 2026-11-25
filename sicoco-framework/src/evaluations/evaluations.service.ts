import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QualityAudit,
  QualityAuditDocument,
} from './schemas/quality-audit.schema.js';
import {
  UxEvaluation,
  UxEvaluationDocument,
} from './schemas/ux-evaluation.schema.js';
import {
  PilotSurvey,
  PilotSurveyDocument,
} from './schemas/pilot-survey.schema.js';
import { CreateQualityAuditDto } from './dto/create-quality-audit.dto.js';
import { CreateUxEvaluationDto } from './dto/create-ux-evaluation.dto.js';
import { CreatePilotSurveyDto } from './dto/create-pilot-survey.dto.js';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectModel(QualityAudit.name)
    private readonly qualityAuditModel: Model<QualityAuditDocument>,
    @InjectModel(UxEvaluation.name)
    private readonly uxEvaluationModel: Model<UxEvaluationDocument>,
    @InjectModel(PilotSurvey.name)
    private readonly pilotSurveyModel: Model<PilotSurveyDocument>,
  ) {}

  // --- 1. Auditoría de Calidad Técnica (Docente) ---
  async createQualityAudit(
    createDto: CreateQualityAuditDto,
  ): Promise<QualityAudit> {
    const created = new this.qualityAuditModel(createDto);
    return created.save();
  }

  async findQualityAudits(summaryId?: string): Promise<QualityAudit[]> {
    const query = summaryId ? { summaryId } : {};
    return this.qualityAuditModel.find(query).sort({ createdAt: -1 }).exec();
  }

  // --- 2. Evaluación de Usabilidad UX (Estudiante) ---
  async createUxEvaluation(
    createDto: CreateUxEvaluationDto,
  ): Promise<UxEvaluation> {
    const created = new this.uxEvaluationModel(createDto);
    return created.save();
  }

  async findUxEvaluations(sessionId?: string): Promise<UxEvaluation[]> {
    const query = sessionId ? { sessionId } : {};
    return this.uxEvaluationModel.find(query).sort({ createdAt: -1 }).exec();
  }

  // --- 3. Encuesta Piloto Formativa (Estudiante) ---
  async createPilotSurvey(createDto: CreatePilotSurveyDto): Promise<PilotSurvey> {
    const created = new this.pilotSurveyModel(createDto);
    return created.save();
  }

  async findPilotSurveys(sessionId?: string): Promise<PilotSurvey[]> {
    const query = sessionId ? { sessionId } : {};
    return this.pilotSurveyModel.find(query).sort({ createdAt: -1 }).exec();
  }

  // --- 4. Métricas Consolidadas para Reportes Institucionales ---
  async getGlobalMetrics(): Promise<{
    qualityAuditsCount: number;
    averageFidelityScore: number;
    totalFalsePositives: number;
    uxEvaluationsCount: number;
    averageVisualClarity: number;
    pilotSurveysCount: number;
    goalComprehensionRate: number;
    averageGroupSupport: number;
  }> {
    const audits = await this.qualityAuditModel.find().exec();
    const uxEvals = await this.uxEvaluationModel.find().exec();
    const surveys = await this.pilotSurveyModel.find().exec();

    const qualityAuditsCount = audits.length;
    const avgFidelity =
      qualityAuditsCount > 0
        ? audits.reduce((acc, a) => acc + a.fidelityScore, 0) / qualityAuditsCount
        : 0;
    const totalFalsePositives = audits.reduce(
      (acc, a) => acc + (a.falsePositivesCount || 0),
      0,
    );

    const uxCount = uxEvals.length;
    const avgVisualClarity =
      uxCount > 0
        ? uxEvals.reduce((acc, u) => acc + u.visualClarityRating, 0) / uxCount
        : 0;

    const pilotCount = surveys.length;
    const improvedCount = surveys.filter(
      (s) => s.goalComprehensionImproved,
    ).length;
    const goalRate =
      pilotCount > 0 ? Math.round((improvedCount / pilotCount) * 100) : 0;
    const avgSupport =
      pilotCount > 0
        ? surveys.reduce((acc, s) => acc + s.groupSupportRating, 0) / pilotCount
        : 0;

    return {
      qualityAuditsCount,
      averageFidelityScore: Math.round(avgFidelity * 10) / 10,
      totalFalsePositives,
      uxEvaluationsCount: uxCount,
      averageVisualClarity: Math.round(avgVisualClarity * 10) / 10,
      pilotSurveysCount: pilotCount,
      goalComprehensionRate: goalRate,
      averageGroupSupport: Math.round(avgSupport * 10) / 10,
    };
  }
}
