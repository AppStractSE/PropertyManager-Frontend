import { TokenInfo } from "./TokenInfo";

export interface User {
  userId: string;
  displayName: string;
  userName: string;
  tokenInfo: TokenInfo;
}
