import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationsService } from './evaluations.service.js';
import { EvaluationsController } from './evaluations.controller.js';
import {
  QualityAudit,
  QualityAuditSchema,
} from './schemas/quality-audit.schema.js';
import {
  UxEvaluation,
  UxEvaluationSchema,
} from './schemas/ux-evaluation.schema.js';
import {
  PilotSurvey,
  PilotSurveySchema,
} from './schemas/pilot-survey.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QualityAudit.name, schema: QualityAuditSchema },
      { name: UxEvaluation.name, schema: UxEvaluationSchema },
      { name: PilotSurvey.name, schema: PilotSurveySchema },
    ]),
  ],
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
  exports: [EvaluationsService],
})
export class EvaluationsModule {}
