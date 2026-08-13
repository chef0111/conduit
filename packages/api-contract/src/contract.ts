import { healthCheckContract } from './contracts/health.js';
import { getSessionContract } from './contracts/session.js';

export const contract = {
  health: {
    check: healthCheckContract,
  },
  auth: {
    getSession: getSessionContract,
  },
};
