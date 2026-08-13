import './load-env.js';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors({
    origin:
      process.env.BETTER_AUTH_TRUSTED_ORIGIN ?? 'https://conduit.localhost',
    credentials: true,
  });
  const port = Number(process.env.PORT ?? 3333);
  const host = process.env.HOST ?? '0.0.0.0';
  await app.listen(port, host);
  const publicUrl = process.env.PORTLESS_URL ?? `http://localhost:${port}`;
  console.log(`[server] listening on ${publicUrl} (bind ${host}:${port})`);
}

void bootstrap();
