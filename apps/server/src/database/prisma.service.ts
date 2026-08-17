import { Injectable, type OnModuleDestroy } from '@nestjs/common';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

import { PrismaClient } from '../generated/prisma/client.js';

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
