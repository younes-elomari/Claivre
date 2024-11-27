"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalAccountSchema } from "@/app/validationSchemas";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/components/ErrorMessage";

type GeneralAccountFormData = z.infer<typeof generalAccountSchema>;

const GeneralAccountForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneralAccountFormData>({
    resolver: zodResolver(generalAccountSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/generalAccounts/", data);
      router.push("/generalAccounts");
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
            placeholder="nom"
            className="mt-2"
            {...register("name")}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Sold débiteur:
          </Text>
          <TextField.Root
            type="number"
            step="0.01"
            placeholder="sold débiteur"
            className="mt-2"
            {...register("debitSold")}
          />
          <ErrorMessage>{errors.debitSold?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Sold créditeur:
          </Text>
          <TextField.Root
            type="number"
            step="0.01"
            placeholder="sold créditeur"
            className="mt-2"
            {...register("creditSold")}
          />
          <ErrorMessage>{errors.creditSold?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          <Text className="cursor-pointer">Ajouter</Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default GeneralAccountForm;
