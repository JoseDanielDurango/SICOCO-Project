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

  // --- Quality and Technical Accuracy ---
  @Post('quality')
  @ApiOperation({ summary: 'Record teacher technical fidelity audit (Control_Calidad_Bot)' })
  @ApiResponse({ status: 201, description: 'Quality audit recorded successfully.' })
  createQualityAudit(@Body() createDto: CreateQualityAuditDto) {
    return this.evaluationsService.createQualityAudit(createDto);
  }

  @Get('quality')
  @ApiOperation({ summary: 'List technical quality audits' })
  @ApiQuery({ name: 'summaryId', required: false, type: String })
  findQualityAudits(@Query('summaryId') summaryId?: string) {
    return this.evaluationsService.findQualityAudits(summaryId);
  }

  // --- Usability UX ---
  @Post('ux')
  @ApiOperation({ summary: 'Record student UI usability evaluation (Evaluacion_UX)' })
  @ApiResponse({ status: 201, description: 'UX evaluation saved successfully.' })
  createUxEvaluation(@Body() createDto: CreateUxEvaluationDto) {
    return this.evaluationsService.createUxEvaluation(createDto);
  }

  @Get('ux')
  @ApiOperation({ summary: 'List UX usability evaluations' })
  @ApiQuery({ name: 'sessionId', required: false, type: String })
  findUxEvaluations(@Query('sessionId') sessionId?: string) {
    return this.evaluationsService.findUxEvaluations(sessionId);
  }

  // --- Formative Pilot Survey ---
  @Post('pilot')
  @ApiOperation({ summary: 'Record pilot formative educational utility survey (Encuesta_Piloto)' })
  @ApiResponse({ status: 201, description: 'Pilot survey recorded successfully.' })
  createPilotSurvey(@Body() createDto: CreatePilotSurveyDto) {
    return this.evaluationsService.createPilotSurvey(createDto);
  }

  @Get('pilot')
  @ApiOperation({ summary: 'List pilot survey responses' })
  @ApiQuery({ name: 'sessionId', required: false, type: String })
  findPilotSurveys(@Query('sessionId') sessionId?: string) {
    return this.evaluationsService.findPilotSurveys(sessionId);
  }

  // --- Consolidated MODESEC Metrics ---
  @Get('metrics')
  @ApiOperation({ summary: 'Retrieve consolidated global metrics for quality, UX, and formative utility' })
  getGlobalMetrics() {
    return this.evaluationsService.getGlobalMetrics();
  }
}
