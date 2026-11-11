import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SummariesService } from './summaries.service.js';
import { Summary } from './schemas/summary.schema.js';

describe('SummariesService', () => {
  let service: SummariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummariesService,
        {
          provide: getModelToken(Summary.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SummariesService>(SummariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
