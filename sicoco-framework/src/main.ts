import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule, ObserveInstrument } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/http-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Basic security headers (Phase 4)
  app.use(helmet());

  // Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe for all DTOs (Phase 3)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Global exception filter with standardized error format (Phase 3)
  app.useGlobalFilters(new AllExceptionsFilter());

  // Interactive OpenAPI / Swagger Documentation (Phase 5)
  const config = new DocumentBuilder()
    .setTitle('Sicoco API')
    .setDescription(
      'API documentation for SICOCO (Sintetizador de Co-creación Colaborativa) based on the MODESEC methodology.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('health', 'System health check and operational status')
    .addTag('auth', 'Authentication, password encryption (bcrypt), and JWT access tokens')
    .addTag('users', 'User profiles and academic identity entities')
    .addTag('courses', 'Academic courses and subject management')
    .addTag('teams', 'Collaborative work teams and memberships')
    .addTag('sessions', 'Collaborative work sessions and meeting records')
    .addTag('transcripts', 'Chat message and conversation transcript ingestion')
    .addTag(
      'summaries',
      'MODESEC synthesis engine (Agreements, Disagreements, Doubts, Tasks, and Timeline)',
    )
    .addTag('prompts', 'Master prompt configurations and synthesis profiles (MODESEC Zone 3)')
    .addTag('tasks', 'Collaborative task management (To-Do), assignments, and progress tracking')
    .addTag('evaluations', 'Quality audits, UX evaluations, and educational pilot surveys (MODESEC Zone 4)')
    .addTag('aliases', 'Chat alias resolution and student account mapping (U1-01)')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
