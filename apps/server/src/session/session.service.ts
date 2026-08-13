import type { IncomingHttpHeaders } from 'node:http';

import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

import { auth, type Session } from '../auth.js';

@Injectable()
export class SessionService {
  async getSession(request: Request): Promise<Session | null> {
    return auth.api.getSession({
      headers: toWebHeaders(request.headers),
    });
  }
}

function toWebHeaders(incoming: IncomingHttpHeaders): Headers {
  const headers = new Headers();

  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
      continue;
    }

    headers.set(key, value);
  }

  return headers;
}
