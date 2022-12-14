import { Chore } from "../models/Chore";
const ChoreData: Chore[] = [
  {
    id: "1",
    name: "Ogräsbekämpning, betongplattor och asfalt",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
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
