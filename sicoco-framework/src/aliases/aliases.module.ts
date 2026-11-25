import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AliasesService } from './aliases.service.js';
import { AliasesController } from './aliases.controller.js';
import {
  StudentAlias,
  StudentAliasSchema,
} from './schemas/alias.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentAlias.name, schema: StudentAliasSchema },
    ]),
  ],
  controllers: [AliasesController],
  providers: [AliasesService],
  exports: [AliasesService],
})
export class AliasesModule {}
