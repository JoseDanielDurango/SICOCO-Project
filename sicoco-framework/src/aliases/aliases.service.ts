import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentAlias, StudentAliasDocument } from './schemas/alias.schema.js';
import { CreateAliasDto } from './dto/create-alias.dto.js';

@Injectable()
export class AliasesService {
  constructor(
    @InjectModel(StudentAlias.name)
    private readonly aliasModel: Model<StudentAliasDocument>,
  ) {}

  async create(createDto: CreateAliasDto): Promise<StudentAlias> {
    const existing = await this.aliasModel
      .findOne({ aliasText: createDto.aliasText.trim() })
      .exec();
    if (existing) {
      throw new ConflictException(
        `Alias "${createDto.aliasText}" is already registered to a student`,
      );
    }
    const created = new this.aliasModel({
      ...createDto,
      aliasText: createDto.aliasText.trim(),
    });
    return created.save();
  }

  async findAll(): Promise<StudentAlias[]> {
    return this.aliasModel.find().sort({ aliasText: 1 }).exec();
  }

  async findByStudent(studentId: string): Promise<StudentAlias[]> {
    return this.aliasModel.find({ studentId }).exec();
  }

  async resolveAlias(aliasText: string): Promise<StudentAlias | null> {
    return this.aliasModel.findOne({ aliasText: aliasText.trim() }).exec();
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.aliasModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Alias with id ${id} not found`);
    }
    return { deleted: true };
  }
}
