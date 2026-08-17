import { Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { onError, ORPCModule } from '@orpc/nest';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { auth } from './auth.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthController } from './health.controller.js';
import { SessionController } from './session/session.controller.js';
import { SessionService } from './session/session.service.js';

declare module '@orpc/nest' {
  interface ORPCGlobalContext {
    request: Request;
  }
}

@Module({
  imports: [
    DatabaseModule,
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: '2mb' },
        urlencoded: { limit: '2mb', extended: true },
      },
    }),
    ORPCModule.forRootAsync({
      useFactory: (request: Request) => ({
        interceptors: [
          onError((error) => {
            console.error(error);
          }),
        ],
        context: { request },
        plugins: [],
      }),
      inject: [REQUEST],
    }),
  ],
  controllers: [HealthController, SessionController],
  providers: [SessionService],
})
export class AppModule {}
