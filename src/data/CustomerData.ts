import { Customer } from "../models/Customer";
import ChoreData from "./ChoreData";
const CustomerData: Customer[] = [
  {
    id: "1",
    name: "BRF Motorn",
    address: "Storgatan 11",
    chores: [...ChoreData],
  },
  {
    id: "2",
    name: "Billingelund",
    address: "Lillgatan 13",
    chores: [...ChoreData],
  },
];

export default CustomerData;
