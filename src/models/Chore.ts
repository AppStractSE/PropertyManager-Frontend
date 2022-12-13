import { Category } from "./Category";

export interface Chore {
  id: string;
  name: string;
  description: string;
  category: Category;
}
