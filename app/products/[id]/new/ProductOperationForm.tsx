"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import { productOperationSchema } from "@/app/validationSchemas";
import toast, { Toaster } from "react-hot-toast";
import SelectComponent from "@/app/components/SelectComponent";

type ProductOperationFormData = z.infer<typeof productOperationSchema>;

const ProductOperationForm = () => {
  const params = useParams();
  const router = useRouter();
  const productId: string = typeof params.id === "string" ? params.id : "";
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProductOperationFormData>({
    resolver: zodResolver(productOperationSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 16),
      productId: productId,
    },
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: products, isLoading } = useProducts();

  const onSubmit = handleSubmit(async (data) => {
    if (
      !watch("purchasePrice") &&
      !watch("purchaseQuantity") &&
      !watch("salePrice") &&
      !watch("saleQuantity")
    )
      return toast.error("Price and Quantity are empty.");

    const newData = {
      productId: data.productId,
      purchasePrice: data.purchasePrice,
      data: new Date(data.date!),
      purchaseQuantity: data.purchaseQuantity,
      salePrice: data.salePrice,
      saleQuantity: data.saleQuantity,
      unitPrice:
        data.purchaseQuantity && data.purchasePrice
          ? data.purchasePrice / data.purchaseQuantity
          : data.saleQuantity && data.salePrice
          ? data.salePrice / data.saleQuantity
          : 0,
    };

    try {
      setSubmitting(true);
      await axios.post("/api/productOperations/", newData);
      router.push(`/products/${params.id}`);
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("Une erreur inattendue s'est produite.");

    }
  });

  const calculateUnitPrice = () => {
    if (watch("purchaseQuantity") && watch("purchasePrice"))
      return watch("purchasePrice") / watch("purchaseQuantity");
    if (watch("saleQuantity") && watch("salePrice"))
      return watch("salePrice") / watch("saleQuantity");
    return 0;
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={onSubmit}>
        <Flex direction="column" width="100%" gap="2">
          <Text size="3" className="font-medium">
            Produit: {isLoading && <Spinner />}
          </Text>
          <Controller
            name="productId"
            control={control}
            render={({ field }) => (
              <SelectComponent
                data={products || []}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Produit"
              />
            )}
          />
          <ErrorMessage>{errors.productId?.message}</ErrorMessage>
        </Flex>
        <div>
          <Text size="3" className="font-medium">
            Date:
          </Text>
          <TextField.Root
            type="datetime-local"
            placeholder="date"
            className="mt-2"
            {...register("date")}
          />
          <ErrorMessage>{errors.date?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Quantité d&apos;achat:
          </Text>
          <TextField.Root
            type="number"            
            placeholder="quantité d'achat"
            className="mt-2"
            {...register("purchaseQuantity")}
            disabled={
              watch("saleQuantity") || watch("salePrice") ? true : false
            }
          />
          <ErrorMessage>{errors.purchaseQuantity?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Prix d&apos;achat:
          </Text>
          <TextField.Root
            type="number"            
            placeholder="prix d'achat"
            className="mt-2"
            {...register("purchasePrice")}
            disabled={
              watch("saleQuantity") || watch("salePrice") ? true : false
            }
          />
          <ErrorMessage>{errors.purchasePrice?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Quantité de vente:
          </Text>
          <TextField.Root
            type="number"            
            placeholder="quantité de vente"
            className="mt-2"
            {...register("saleQuantity")}
            disabled={
              watch("purchaseQuantity") || watch("purchasePrice") ? true : false
            }
          />
          <ErrorMessage>{errors.saleQuantity?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Prix de vente:
          </Text>
          <TextField.Root
            type="number"            
            placeholder="prix de vente"
            className="mt-2"
            {...register("salePrice")}
            disabled={
              watch("purchaseQuantity") || watch("purchasePrice") ? true : false
            }
          />
          <ErrorMessage>{errors.salePrice?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Prix unitaire:
          </Text>
          <TextField.Root
            value={calculateUnitPrice()}
            type="number"            
            placeholder="prix unitaire"
            className="mt-2"
            {...register("unitPrice")}
            disabled={true}
          />
          <ErrorMessage>{errors.unitPrice?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          <Text className="cursor-pointer">Ajouter</Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => axios.get("/api/products").then((res) => res.data),
    retry: 3,
  });

export default ProductOperationForm;
