import { InitialUserState } from "../contexts/UserContext";

export class BaseClient {
  envUrl = import.meta.env.REACT_APP_API_URL;
  getBaseUrl = (_: string, __: string | undefined) =>
    import.meta.env.DEV ? "https://localhost:7178" : this.envUrl;

  protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
    let tokenInfo = InitialUserState.tokenInfo;
    const jsonValue = window.localStorage.getItem("token");
    if (jsonValue != null) {
      tokenInfo = JSON.parse(jsonValue);
    }
    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + tokenInfo?.token ?? "",
    };
    return Promise.resolve(options);
  };
}
