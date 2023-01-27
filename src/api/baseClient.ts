import.meta.env.DEV;

export class BaseClient {
  getBaseUrl = (_: string, __: string | undefined) =>
    import.meta.env.DEV ? "https://localhost:7178" : "http://legitURL.com";
}
