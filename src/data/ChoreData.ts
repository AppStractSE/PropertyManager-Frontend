import { Chore } from "../models/Chore";
const ChoreData: Chore[] = [
  {
    id: "1",
    name: "Ogräsbekämpning, betongplattor och asfalt",
    description: "Chore 1, Kategori 1",
    category: { id: "1", name: "Hårda ytor" },
  },
  {
    id: "2",
    name: "Lövhantering hårdgjorda ytor",
    description: "Chore 2, Kategori 1",
    category: { id: "1", name: "Hårda ytor" },
  },
  {
    id: "3",
    name: "Vårluckring i rabatter",
    description: "Chore 3, Kategori 2",
    category: { id: "2", name: "Planteringsytor" },
  },
  {
    id: "4",
    name: "Beskärning buskar",
    description: "Chore 4, Kategori 2",
    category: { id: "2", name: "Planteringsytor" },
  },
];

export default ChoreData;
