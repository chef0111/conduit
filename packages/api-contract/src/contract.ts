import { healthCheckContract } from "./contracts/health.js";

export const contract = {
  health: {
    check: healthCheckContract,
  },
};
