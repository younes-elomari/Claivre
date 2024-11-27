"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/components/ErrorMessage";
import { productSchema } from "@/app/validationSchemas";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/products/", data);
      router.push("/products");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("Une erreur inattendue s'est produite.");

    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <Text size="3" className="font-medium">
            Nom:
          </Text>
          <TextField.Root
            type="text"
            placeholder="Nom"
            className="mt-2"
            {...register("name")}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Unité:
          </Text>
          <TextField.Root
            type="text"
            placeholder="Unité"
            className="mt-2"
            {...register("unit")}
          />
          <ErrorMessage>{errors.unit?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Stock:
          </Text>
          <TextField.Root
            type="number"
            step="0.01"
            placeholder="stock"
            className="mt-2"
            {...register("stock")}
          />
          <ErrorMessage>{errors.stock?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Prix total:
          </Text>
          <TextField.Root
            type="number"
            step="0.01"
            placeholder="Prix total"
            className="mt-2"
            {...register("purchasePrice")}
          />
          <ErrorMessage>{errors.purchasePrice?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting}>
          <Text className="cursor-pointer">Ajouter</Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
