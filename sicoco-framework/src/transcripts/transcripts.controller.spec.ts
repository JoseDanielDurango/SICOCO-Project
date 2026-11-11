import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptsController } from './transcripts.controller.js';
import { TranscriptsService } from './transcripts.service.js';

describe('TranscriptsController', () => {
  let controller: TranscriptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranscriptsController],
      providers: [
        {
          provide: TranscriptsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TranscriptsController>(TranscriptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
