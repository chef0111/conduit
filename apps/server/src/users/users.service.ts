import type { IncomingHttpHeaders } from 'node:http';

import { Injectable } from '@nestjs/common';
import { AuthService } from '@thallesp/nestjs-better-auth';
import type { Request } from 'express';

import type { Auth, Session } from '../auth/auth.config.js';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService<Auth>) {}

  async getSession(request: Request): Promise<Session | null> {
    return this.authService.api.getSession({
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
