import './load-env';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { OpenAPIGenerator } from '@orpc/openapi';
import { ZodToJsonSchemaConverter } from '@orpc/zod';
import { contract } from '@repo/contract';
import swaggerUi from 'swagger-ui-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin:
      process.env.BETTER_AUTH_TRUSTED_ORIGIN ?? 'https://conduit.localhost',
    credentials: true,
  });

  const generator = new OpenAPIGenerator({
    schemaConverters: [new ZodToJsonSchemaConverter()],
  });

  const spec = await generator.generate(contract, {
    info: {
      title: 'Conduit API',
      version: '0.1.0',
    },
  });

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

  const port = Number(process.env.PORT ?? 3333);
  const host = process.env.HOST ?? '0.0.0.0';
  await app.listen(port, host);
  const publicUrl = process.env.PORTLESS_URL ?? `http://localhost:${port}`;
  console.log(`[server] listening on ${publicUrl} (bind ${host}:${port})`);
}

void bootstrap();
