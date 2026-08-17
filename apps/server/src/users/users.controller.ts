import { Controller, Inject } from '@nestjs/common';
import { Implement, implement } from '@orpc/nest';
import { contract } from '@repo/contracts';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

import { UsersService } from './users.service.js';

@Controller()
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService
  ) {}

  @AllowAnonymous()
  @Implement(contract.users.getSession)
  getSession() {
    return implement(contract.users.getSession).handler(async ({ context }) => {
      return this.usersService.getSession(context.request);
    });
  }
}
