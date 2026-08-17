import { Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { onError, ORPCModule } from '@orpc/nest';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { createAuth } from './auth/auth.config.js';
import { DatabaseModule } from './database/database.module.js';
import { PrismaService } from './database/prisma.service.js';
import { HealthController } from './health.controller.js';
import { UsersController } from './users/users.controller.js';
import { UsersService } from './users/users.service.js';

declare module '@orpc/nest' {
  interface ORPCGlobalContext {
    request: Request;
  }
}

@Module({
  imports: [
    DatabaseModule,
    AuthModule.forRootAsync({
      useFactory: (prisma: PrismaService) => ({
        auth: createAuth(prisma),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
        },
      }),
      inject: [PrismaService],
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
  controllers: [HealthController, UsersController],
  providers: [UsersService],
})
export class AppModule {}
