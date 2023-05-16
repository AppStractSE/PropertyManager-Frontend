export class BaseClient {
  getBaseUrl = (_: string, __: string | undefined) =>
    import.meta.env.PROD ? "https://localhost:7178" : "https://propertymanger.azurewebsites.net";

  protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
    const token = this.getTokenFromLocalStorage();
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    return options;
  };

  private getTokenFromLocalStorage(): string | undefined {
    const jsonValue = window.localStorage.getItem("token");
    if (jsonValue != null) {
      const tokenInfo = JSON.parse(jsonValue);
      return tokenInfo.token as string;
    }
    throw new Error("Token not found");
  }
}
