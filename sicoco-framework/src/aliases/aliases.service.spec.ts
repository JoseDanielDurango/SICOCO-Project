import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AliasesService } from './aliases.service.js';
import { StudentAlias } from './schemas/alias.schema.js';

describe('AliasesService', () => {
  let service: AliasesService;
  const mockModel = {
    find: vi.fn(),
    findOne: vi.fn(),
    findByIdAndDelete: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AliasesService,
        {
          provide: getModelToken(StudentAlias.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<AliasesService>(AliasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
