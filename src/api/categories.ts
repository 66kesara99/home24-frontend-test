import { Category } from "../entities/category-entity";

export async function getCategories(): Promise<Category[]> {
  const result = await fetch(`http://localhost:3000/categories`);

  const jsonResult = await result.json();
  return jsonResult;
}
