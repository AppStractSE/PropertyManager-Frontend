import { Chore } from "./Chore";
import { Customer } from "./Customer";
import { Periodic } from "./Periodic";

export interface CustomerChore {
  id: string;
  name: string;
  frequency: number;
  periodic: Periodic;
  chore: Chore;
  customer: Customer;
}
