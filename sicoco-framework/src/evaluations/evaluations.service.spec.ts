import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EvaluationsService } from './evaluations.service.js';
import { QualityAudit } from './schemas/quality-audit.schema.js';
import { UxEvaluation } from './schemas/ux-evaluation.schema.js';
import { PilotSurvey } from './schemas/pilot-survey.schema.js';

describe('EvaluationsService', () => {
  let service: EvaluationsService;
  const mockModel = {
    find: vi.fn().mockReturnValue({
      sort: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue([]),
      }),
      exec: vi.fn().mockResolvedValue([]),
    }),
    findById: vi.fn(),
    save: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationsService,
        {
          provide: getModelToken(QualityAudit.name),
          useValue: mockModel,
        },
        {
          provide: getModelToken(UxEvaluation.name),
          useValue: mockModel,
        },
        {
          provide: getModelToken(PilotSurvey.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<EvaluationsService>(EvaluationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
