import { Test, TestingModule } from '@nestjs/testing';
import { SummariesController } from './summaries.controller.js';
import { SummariesService } from './summaries.service.js';

describe('SummariesController', () => {
  let controller: SummariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummariesController],
      providers: [
        {
          provide: SummariesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SummariesController>(SummariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
