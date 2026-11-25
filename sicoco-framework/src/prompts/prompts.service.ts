import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PromptConfiguration,
  PromptConfigurationDocument,
} from './schemas/prompt.schema.js';
import { CreatePromptDto } from './dto/create-prompt.dto.js';
import { UpdatePromptDto } from './dto/update-prompt.dto.js';

@Injectable()
export class PromptsService implements OnModuleInit {
  constructor(
    @InjectModel(PromptConfiguration.name)
    private readonly promptModel: Model<PromptConfigurationDocument>,
  ) {}

  async onModuleInit() {
    // Seed default MODESEC prompts if collection is empty
    const count = await this.promptModel.countDocuments().exec();
    if (count === 0) {
      await this.promptModel.insertMany([
        {
          styleName: 'Formal / Academic',
          systemPrompt:
            'You are the SICOCO pedagogical synthesizer for University of Cordoba. Analyze the collaborative chat and formally structure the four MODESEC pillars: 1) Agreements with justification, 2) Disagreements with opposing viewpoints, 3) Open conceptual doubts, and 4) Tasks with assigned students and formative deadlines. Write in impeccable academic prose.',
          isActive: true,
          temperature: 0.3,
          modesecFocus: 'Conceptual rigor and teacher competency evaluation',
        },
        {
          styleName: 'Fast / Direct (To-Do Sprint)',
          systemPrompt:
            'You are the agile SICOCO assistant. Extract in an ultra-synthetic manner and direct bullet points: key consensus items, pending discussions, and the immediate task list with assigned students.',
          isActive: true,
          temperature: 0.2,
          modesecFocus: 'Rapid operational coordination and delivery tracking',
        },
        {
          styleName: 'Metacognitive / Co-creation',
          systemPrompt:
            'You are the SICOCO metacognitive mediator. Identify the genesis and evolution of ideas: how a peer\'s proposal inspired another\'s final solution. Highlight the value of constructive group debate and negotiation of meaning.',
          isActive: true,
          temperature: 0.5,
          modesecFocus: 'Co-creation mapping and learning self-regulation',
        },
      ]);
    }
  }

  async create(createPromptDto: CreatePromptDto): Promise<PromptConfiguration> {
    const created = new this.promptModel(createPromptDto);
    return created.save();
  }

  async findAll(activeOnly?: boolean): Promise<PromptConfiguration[]> {
    const query = activeOnly ? { isActive: true } : {};
    return this.promptModel.find(query).sort({ styleName: 1 }).exec();
  }

  async findOne(id: string): Promise<PromptConfiguration> {
    const prompt = await this.promptModel.findById(id).exec();
    if (!prompt) {
      throw new NotFoundException(`Prompt configuration with id ${id} not found`);
    }
    return prompt;
  }

  async findActiveDefault(): Promise<PromptConfiguration> {
    const prompt = await this.promptModel.findOne({ isActive: true }).exec();
    if (!prompt) {
      throw new NotFoundException('No active prompt configuration found');
    }
    return prompt;
  }

  async update(
    id: string,
    updatePromptDto: UpdatePromptDto,
  ): Promise<PromptConfiguration> {
    const updated = await this.promptModel
      .findByIdAndUpdate(id, updatePromptDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Prompt configuration with id ${id} not found`);
    }
    return updated;
  }

  async toggleActive(id: string): Promise<PromptConfiguration> {
    const prompt = await this.findOne(id);
    prompt.isActive = !prompt.isActive;
    return this.promptModel
      .findByIdAndUpdate(id, { isActive: prompt.isActive }, { new: true })
      .exec() as Promise<PromptConfiguration>;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.promptModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Prompt configuration with id ${id} not found`);
    }
    return { deleted: true };
  }
}
