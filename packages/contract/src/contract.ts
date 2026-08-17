import { healthCheckContract } from './contracts/health.js';
import { getSessionContract } from './contracts/users.js';

export const contract = {
  health: {
    check: healthCheckContract,
  },
  users: {
    getSession: getSessionContract,
  },
};
