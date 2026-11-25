import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SummariesService } from './summaries.service.js';
import { Summary } from './schemas/summary.schema.js';
import { Transcript } from '../transcripts/schemas/transcript.schema.js';
import { Task } from '../tasks/schemas/task.schema.js';

describe('SummariesService', () => {
  let service: SummariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummariesService,
        {
          provide: getModelToken(Summary.name),
          useValue: {
            find: vi.fn(),
            findById: vi.fn(),
            findOne: vi.fn(),
            create: vi.fn(),
          },
        },
        {
          provide: getModelToken(Transcript.name),
          useValue: {
            find: vi.fn(),
          },
        },
        {
          provide: getModelToken(Task.name),
          useValue: {
            create: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SummariesService>(SummariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
