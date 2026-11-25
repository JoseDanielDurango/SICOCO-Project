import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { EvaluationsService } from './evaluations.service.js';
import { CreateQualityAuditDto } from './dto/create-quality-audit.dto.js';
import { CreateUxEvaluationDto } from './dto/create-ux-evaluation.dto.js';
import { CreatePilotSurveyDto } from './dto/create-pilot-survey.dto.js';

@ApiTags('evaluations')
@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  // --- Calidad y Precisión Técnica ---
  @Post('quality')
  @ApiOperation({ summary: 'Registrar auditoría técnica docente de fidelidad (Control_Calidad_Bot)' })
  @ApiResponse({ status: 201, description: 'Auditoría registrada exitosamente.' })
  createQualityAudit(@Body() createDto: CreateQualityAuditDto) {
    return this.evaluationsService.createQualityAudit(createDto);
  }

  @Get('quality')
  @ApiOperation({ summary: 'Listar auditorías de calidad técnica' })
  @ApiQuery({ name: 'summaryId', required: false, type: String })
  findQualityAudits(@Query('summaryId') summaryId?: string) {
    return this.evaluationsService.findQualityAudits(summaryId);
  }

  // --- Usabilidad UX ---
  @Post('ux')
  @ApiOperation({ summary: 'Registrar evaluación de usabilidad de interfaz por estudiante (Evaluacion_UX)' })
  @ApiResponse({ status: 201, description: 'Evaluación UX guardada.' })
  createUxEvaluation(@Body() createDto: CreateUxEvaluationDto) {
    return this.evaluationsService.createUxEvaluation(createDto);
  }

  @Get('ux')
  @ApiOperation({ summary: 'Listar evaluaciones de usabilidad UX' })
  @ApiQuery({ name: 'sessionId', required: false, type: String })
  findUxEvaluations(@Query('sessionId') sessionId?: string) {
    return this.evaluationsService.findUxEvaluations(sessionId);
  }

  // --- Encuesta Piloto Formativa ---
  @Post('pilot')
  @ApiOperation({ summary: 'Registrar encuesta piloto de utilidad educativa formativa (Encuesta_Piloto)' })
  @ApiResponse({ status: 201, description: 'Encuesta piloto registrada.' })
  createPilotSurvey(@Body() createDto: CreatePilotSurveyDto) {
    return this.evaluationsService.createPilotSurvey(createDto);
  }

  @Get('pilot')
  @ApiOperation({ summary: 'Listar respuestas de la encuesta piloto' })
  @ApiQuery({ name: 'sessionId', required: false, type: String })
  findPilotSurveys(@Query('sessionId') sessionId?: string) {
    return this.evaluationsService.findPilotSurveys(sessionId);
  }

  // --- Métricas Globales de MODESEC ---
  @Get('metrics')
  @ApiOperation({ summary: 'Obtener métricas globales consolidadas de calidad, UX y utilidad formativa' })
  getGlobalMetrics() {
    return this.evaluationsService.getGlobalMetrics();
  }
}
