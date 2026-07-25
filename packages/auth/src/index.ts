export { createAuth } from "./auth.js";
export type { Auth, Session } from "./auth.js";
export { authClient, createAppAuthClient } from "./client.js";
export {
  signInEmailSchema,
  signUpEmailSchema,
  emailOtpSchema,
} from "./schemas.js";
export type {
  SignInEmailInput,
  SignUpEmailInput,
  EmailOtpInput,
} from "./schemas.js";
