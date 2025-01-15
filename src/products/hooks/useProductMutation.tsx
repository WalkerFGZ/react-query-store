import { Product, productActions } from "..";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProductMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product): { optimisticProduct: Product } => {
      const optimisticProduct = { id: Math.random(), ...product };
      debugger;
      queryClient.setQueriesData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct];

          return optimisticProduct;
        }
      );
    },
    onSuccess: (
      product,
      variables,
      context: { optimisticProduct: Product }
    ) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });

      queryClient.removeQueries(["products", context?.optimisticProduct?.id]);
      queryClient.setQueriesData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [product];
          return old.map((cacheProduct: Product) => {
            return cacheProduct.id === context?.optimisticProduct?.id
              ? product
              : cacheProduct;
          });
        }
      );
    },
    onError: (error, variables, context) => {
      queryClient.removeQueries(["products", context?.optimisticProduct?.id]);
      queryClient.setQueriesData<Product[]>(
        ["products", { filterKey: variables.category }],
        (old) => {
          if (!old) return [];
          return old.filter(
            (product) => product.id !== context?.optimisticProduct?.id
          );
        }
      );
    },
  });

  return mutation;
};
