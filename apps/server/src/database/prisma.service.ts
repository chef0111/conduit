import { PrismaClient } from '@generated/prisma/client.js';
import { neonConfig } from '@neondatabase/serverless';
import { Injectable, type OnModuleDestroy } from '@nestjs/common';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('Missing DATABASE_URL (Neon connection string)');
    }

    super({ adapter: new PrismaNeon({ connectionString }) });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
