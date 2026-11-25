import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptsService } from './prompts.service.js';
import { PromptsController } from './prompts.controller.js';
import {
  PromptConfiguration,
  PromptConfigurationSchema,
} from './schemas/prompt.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PromptConfiguration.name, schema: PromptConfigurationSchema },
    ]),
  ],
  controllers: [PromptsController],
  providers: [PromptsService],
  exports: [PromptsService],
})
export class PromptsModule {}
