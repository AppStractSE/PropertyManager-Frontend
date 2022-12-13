import { Chore } from "./Chore";

export interface Customer {
  id: string;
  name: string;
  chores: Chore[];
}
