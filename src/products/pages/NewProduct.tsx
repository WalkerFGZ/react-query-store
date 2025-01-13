import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useProductMutation } from "../hooks/useProductMutation";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export const NewProduct = () => {
  const productMutation = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Teclado",
      price: 150.22,
      description: "lore ipsum dolor sit amet",
      category: "men's clothing",
      image:
        "https://panamericana.vtexassets.com/arquivos/ids/490960/teclado-alambrico-gaming-kb869l-sp-gamenote-2-6939119097288.jpg?v=638175180420800000",
    },
  });

  const newImage = watch("image");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(Number(e.target.value))} // Add this line
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripción del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Cargando" : "Crear Producto"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
