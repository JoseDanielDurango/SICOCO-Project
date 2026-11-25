import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AliasesController } from './aliases.controller.js';
import { AliasesService } from './aliases.service.js';

describe('AliasesController', () => {
  let controller: AliasesController;
  const mockService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findByStudent: vi.fn(),
    resolveAlias: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AliasesController],
      providers: [
        {
          provide: AliasesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AliasesController>(AliasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
