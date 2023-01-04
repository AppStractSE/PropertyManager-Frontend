import { Category } from "./Category";

export interface Chore {
  id: string;
  title: string;
  description: string;
  category: Category;
}
