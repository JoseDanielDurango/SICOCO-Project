import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PromptsService } from './prompts.service.js';
import { PromptConfiguration } from './schemas/prompt.schema.js';

describe('PromptsService', () => {
  let service: PromptsService;
  const mockModel = {
    find: vi.fn(),
    findById: vi.fn(),
    findOne: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
    countDocuments: vi.fn(),
    insertMany: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromptsService,
        {
          provide: getModelToken(PromptConfiguration.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<PromptsService>(PromptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
