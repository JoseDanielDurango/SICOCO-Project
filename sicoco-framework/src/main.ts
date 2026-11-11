import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const config = new DocumentBuilder()
    .setTitle('Sicoco API')
    .setDescription(
      'API documentation for SICOCO (Sintetizador de Co-creación Colaborativa) based on the MODESEC methodology.',
    )
    .setVersion('1.0')
    .addTag('users', 'User profiles and authentication entities')
    .addTag('courses', 'Academic courses and subject management')
    .addTag('teams', 'Collaborative work teams and memberships')
    .addTag('sessions', 'Collaborative work sessions and meeting records')
    .addTag('transcripts', 'Chat message and conversation transcript ingestion')
    .addTag(
      'summaries',
      'MODESEC synthesis engine (Agreements, Disagreements, Doubts, Tasks and Timeline)',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
