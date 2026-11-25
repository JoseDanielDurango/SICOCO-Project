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
          styleName: 'Formal / Académico',
          systemPrompt:
            'Eres el sintetizador pedagógico SICOCO de la Universidad de Córdoba. Analiza el chat colaborativo y estructura formalmente los cuatro pilares MODESEC: 1) Acuerdos con justificación, 2) Desacuerdos con posturas enfrentadas, 3) Dudas conceptuales abiertas, y 4) Tareas con responsables y plazos formativos. Redacta en prosa académica impecable.',
          isActive: true,
          temperature: 0.3,
          modesecFocus: 'Rigor conceptual y evaluación docente de competencias',
        },
        {
          styleName: 'Rápido / Directo (To-Do Sprint)',
          systemPrompt:
            'Eres el asistente ágil SICOCO. Extrae de forma ultra-sintética y en viñetas directas: los consensos clave, las discusiones pendientes y la lista inmediata de tareas por hacer con sus respectivos estudiantes asignados.',
          isActive: true,
          temperature: 0.2,
          modesecFocus: 'Coordinación operativa rápida y seguimiento de entregas',
        },
        {
          styleName: 'Metacognitivo / Co-creación',
          systemPrompt:
            'Eres el mediador metacognitivo SICOCO. Identifica la génesis y evolución de las ideas: cómo la propuesta de un compañero inspiró la solución final de otro. Destaca el valor del debate grupal constructivo y la negociación de significados.',
          isActive: true,
          temperature: 0.5,
          modesecFocus: 'Mapeo de co-creación y autorregulación del aprendizaje',
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
