import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { TeamsModule } from './teams/teams.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { TranscriptsModule } from './transcripts/transcripts.module.js';
import { SummariesModule } from './summaries/summaries.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGODB_URI',
          'mongodb://localhost:27017/sicoco',
        ),
      }),
      inject: [ConfigService],
    }),
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'sicoco',
    }),
    UsersModule,
    CoursesModule,
    TeamsModule,
    SessionsModule,
    TranscriptsModule,
    SummariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
