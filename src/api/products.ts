import { Product } from "../entities/product-entity";

interface ProductFilterParams {
  selectedCategories?: number[];
}

export async function getProducts(
  productParams: ProductFilterParams
): Promise<Product[]> {
  const { selectedCategories } = productParams;

  const urlParams = new URLSearchParams();

  if (selectedCategories && selectedCategories.length > 0) {
    selectedCategories.forEach((categoryId) => {
      urlParams.append("category_id", categoryId.toString());
    });
  }

  const result = await fetch(
    `http://localhost:3000/products?${urlParams.toString()}`
  );

  const jsonResult = await result.json();
  return jsonResult;
}

export async function getProductById(id: number): Promise<Product> {
  const result = await fetch(`http://localhost:3000/products/${id}`);

  const jsonResult = await result.json();
  return jsonResult;
}

export async function updateProduct(product: Product): Promise<Product> {
  const result = await fetch(`http://localhost:3000/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const jsonResult = await result.json();

  await updateLastModifiedProduct(jsonResult);
  return jsonResult;
}

export async function createProduct(product: Product): Promise<Product> {
  const result = await fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const jsonResult = await result.json();

  await updateLastModifiedProduct(jsonResult);
  return jsonResult;
}

export async function getLastModifiedProduct(): Promise<Product> {
  const result = await fetch(`http://localhost:3000/last-modified`);

  const jsonResult = await result.json();
  return jsonResult;
}

export async function updateLastModifiedProduct(
  product: Product
): Promise<Product> {
  const result = await fetch(`http://localhost:3000/last-modified`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const jsonResult = await result.json();
  return jsonResult;
}
