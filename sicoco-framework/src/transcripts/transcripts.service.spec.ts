import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TranscriptsService } from './transcripts.service.js';
import { Transcript } from './schemas/transcript.schema.js';

describe('TranscriptsService', () => {
  let service: TranscriptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranscriptsService,
        {
          provide: getModelToken(Transcript.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TranscriptsService>(TranscriptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
