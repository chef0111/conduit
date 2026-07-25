import "./load-env.js";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const port = process.env.PORT ?? 3333;
  await app.listen(port);
  console.log(`[server] listening on http://localhost:${port}`);
}

void bootstrap();
