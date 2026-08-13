import { Controller, Inject } from '@nestjs/common';
import { Implement, implement } from '@orpc/nest';
import { contract } from '@repo/api-contract';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

import { SessionService } from './session.service.js';

@Controller()
export class SessionController {
  constructor(
    @Inject(SessionService) private readonly sessionService: SessionService
  ) {}

  @AllowAnonymous()
  @Implement(contract.auth.getSession)
  getSession() {
    return implement(contract.auth.getSession).handler(async ({ context }) => {
      return this.sessionService.getSession(context.request);
    });
  }
}
