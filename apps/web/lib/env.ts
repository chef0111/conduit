export function getAppBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.conduit.localhost';
}

export function getSignUpUrl() {
  return `${getAppBaseUrl()}/sign-up`;
}
