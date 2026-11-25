import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { PromptsController } from './prompts.controller.js';
import { PromptsService } from './prompts.service.js';

describe('PromptsController', () => {
  let controller: PromptsController;
  const mockService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    findActiveDefault: vi.fn(),
    update: vi.fn(),
    toggleActive: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromptsController],
      providers: [
        {
          provide: PromptsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PromptsController>(PromptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
