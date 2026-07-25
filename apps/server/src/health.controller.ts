import { Controller, Get, Header, Res } from "@nestjs/common";
import { Implement, implement } from "@orpc/nest";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { contract } from "@repo/api-contract";
import type { Response } from "express";

@Controller()
export class HealthController {
  @AllowAnonymous()
  @Get()
  root(@Res() res: Response) {
    res.type("html").send("<h1>Welcome to Conduit API</h1>");
  }

  @AllowAnonymous()
  @Implement(contract.health.check)
  check() {
    return implement(contract.health.check).handler(() => ({
      status: "ok" as const,
    }));
  }
}
