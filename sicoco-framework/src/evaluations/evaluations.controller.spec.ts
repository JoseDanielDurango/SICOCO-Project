import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationsController } from './evaluations.controller.js';
import { EvaluationsService } from './evaluations.service.js';

describe('EvaluationsController', () => {
  let controller: EvaluationsController;
  const mockService = {
    createQualityAudit: vi.fn(),
    findQualityAudits: vi.fn(),
    createUxEvaluation: vi.fn(),
    findUxEvaluations: vi.fn(),
    createPilotSurvey: vi.fn(),
    findPilotSurveys: vi.fn(),
    getGlobalMetrics: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationsController],
      providers: [
        {
          provide: EvaluationsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<EvaluationsController>(EvaluationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
