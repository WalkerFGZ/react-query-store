import { productActions } from "..";
import { useMutation } from "@tanstack/react-query";

export const useProductMutation = () => {
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {},
    onSettled: () => {},
  });

  return mutation;
};
