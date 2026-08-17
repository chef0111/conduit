import { Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { onError, ORPCModule } from '@orpc/nest';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { DatabaseModule } from '@/database/database.module';
import { PrismaService } from '@/database/prisma.service';
import { HealthController } from '@/health.controller';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';

import { auth } from './auth/auth.config';

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
