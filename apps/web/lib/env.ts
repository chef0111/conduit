export function getAppBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL!;
}

export function getSignUpUrl() {
  return `${getAppBaseUrl()}/sign-up`;
}
