import { productsApi } from "../api/productsApi";
import { type Product } from "../interfaces/product";

interface GetProductsOptions {
  filterKey?: string;
}

export const sleep = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds));
};
export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const filterUrl = filterKey ? `category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

export interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async (product: ProductLike) => {
  await sleep(5000);
  throw new Error("Failed to create product");
  const { data } = await productsApi.post<ProductLike>(`/products`, product);
  return data;
};
