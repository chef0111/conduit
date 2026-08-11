export function getServerBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ??
    process.env.SERVER_URL ??
    'https://api.conduit.localhost'
  );
}
