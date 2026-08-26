import { type ExecutionContext, Module } from '@nestjs/common';
import { ORPCModule } from '@orpc/nest';
import { onError } from '@orpc/server';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import { DatabaseModule } from '@/database/database.module';
import { HealthController } from '@/health.controller';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';

import { auth } from './auth/auth.config';

declare module '@orpc/server' {
  interface DefaultInitialContext {
    request: Request;
  }
}

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
    ORPCModule.forRoot({
      interceptors: [
        onError((error) => {
          console.error(error);
        }),
      ],
      context: (ctx: object) => ({
        request: (ctx as ExecutionContext).switchToHttp().getRequest<Request>(),
      }),
      plugins: [],
    }),
  ],
  controllers: [HealthController, UsersController],
  providers: [UsersService],
})
export class AppModule {}
