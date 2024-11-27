"use client";
import Spinner from "@/app/components/Spinner";
import {
  Button,
  Callout,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/components/ErrorMessage";
import { tiereAccountSchema } from "@/app/validationSchemas";
import { useQuery } from "@tanstack/react-query";
import { GeneralAccount } from "@prisma/client";
import SelectComponent from "@/app/components/SelectComponent";

type TiereAccountFormData = z.infer<typeof tiereAccountSchema>;

const TiereAccountForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TiereAccountFormData>({
    resolver: zodResolver(tiereAccountSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: generalAccounts } = useGeneralAccounts();

  const onSubmit = handleSubmit(async (data) => {
    const newData = {
      generalAccountId: data.generalAccountId,
      name: data.name,
      debitSold: data.debitSold,
      creditSold: data.creditSold,
      email: data.email || null,
      phone: data.phone || null,
      address: data.address || null,
    };

    try {
      setSubmitting(true);
      await axios.post("/api/tiereAccounts/", newData);
      router.push("/tiereAccounts");
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

        <Flex direction="column" width="100%" gap="2">
          <Text size="3" className="font-medium">
            Compte général:
          </Text>
          <Controller
            name="generalAccountId"
            control={control}
            render={({ field }) => (
              <SelectComponent
                value={field.value || ""}
                onValueChange={field.onChange}
                placeholder="compte général."
                data={generalAccounts || []}
              />
            )}
          />
          <ErrorMessage>{errors.generalAccountId?.message}</ErrorMessage>
        </Flex>
        <div>
          <Text size="3" className="font-medium">
            Sold débiteur:
          </Text>
          <TextField.Root
            type="number"
            placeholder="debit"
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
            placeholder="credit"
            className="mt-2"
            {...register("creditSold")}
          />
          <ErrorMessage>{errors.creditSold?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Email:
          </Text>
          <TextField.Root
            type="email"
            placeholder="email"
            className="mt-2"
            {...register("email")}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Téléphone:
          </Text>
          <TextField.Root
            type="text"
            placeholder="téléphone"
            className="mt-2"
            {...register("phone")}
          />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Adresse:
          </Text>
          <TextField.Root
            type="text"
            placeholder="adresse"
            className="mt-2"
            {...register("address")}
          />
          <ErrorMessage>{errors.address?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          <Text className="cursor-pointer">Ajouter</Text>
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

const useGeneralAccounts = () =>
  useQuery<GeneralAccount[]>({
    queryKey: ["generalAccounts"],
    queryFn: () => axios.get("/api/generalAccounts").then((res) => res.data),
    retry: 3,
  });

export default TiereAccountForm;
