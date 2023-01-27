import.meta.env.DEV;

export class BaseClient {
  getBaseUrl = (_: string, __: string | undefined) =>
    import.meta.env.DEV ? "http://localhost:7178" : "http://legitURL.com";
}
