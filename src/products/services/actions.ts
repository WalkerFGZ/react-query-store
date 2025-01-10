import { productsApi } from "../api/productsApi";
import { type Product } from "../interfaces/product";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds));
};
export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  await sleep(2000);
  const filterUrl = filterKey ? `category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  // await sleep(2000);
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};
