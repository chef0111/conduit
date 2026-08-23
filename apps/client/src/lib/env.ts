export function getServerBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ??
    process.env.SERVER_URL ??
    'https://api.conduit.localhost'
  );
}

export function getAppBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.conduit.localhost';
}

export function getMarketingBaseUrl() {
  return process.env.NEXT_PUBLIC_MARKETING_URL ?? 'https://conduit.localhost';
}
