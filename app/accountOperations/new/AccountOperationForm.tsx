"use client";
import Spinner from "@/app/components/Spinner";
import { Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { GeneralAccount, TiereAccount } from "@prisma/client";
import { accountOperationSchema } from "@/app/validationSchemas";
import toast, { Toaster } from "react-hot-toast";
import SelectComponent from "@/app/components/SelectComponent";

interface Props {
  generalAccount?: GeneralAccount | null;
  tiereAccount?: TiereAccount | null;
}

type AccountOperationFormData = z.infer<typeof accountOperationSchema>;

const AccountOperationForm = ({ generalAccount, tiereAccount }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountOperationFormData>({
    resolver: zodResolver(accountOperationSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 16),
      generalAccountId: tiereAccount
        ? tiereAccount?.generalAccountId.toString()
        : generalAccount?.id.toString(),
      tiereAccountId: tiereAccount?.id.toString(),
    },
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: generalAccounts, isLoading: isGeneralAccountsLoading } =
    useGeneralAccounts();
  const { data: tiereAccounts, isLoading: isTiereAccountsLoading } =
    useTiereAccounts();

  const filtredTiereAccounts = watch("generalAccountId")
    ? tiereAccounts?.filter(
        (account) =>
          account.generalAccountId === parseInt(watch("generalAccountId"))
      )
    : tiereAccounts;

  const onSubmit = handleSubmit(async (data) => {
    if (!data.creditSold && !data.debitSold)
      return toast.error("You have to set Debit Sold, or Credit Sold.");

    const newData = {
      generalAccountId: data.generalAccountId,
      tiereAccountId: data.tiereAccountId,
      date: new Date(data.date!),
      debitSold: data.debitSold,
      creditSold: data.creditSold,
      lebelle: data.lebelle
        ? data.lebelle
        : data.tiereAccountId
        ? tiereAccounts?.find(
            (account) => account.id === parseInt(data.tiereAccountId!)
          )?.name
        : data.generalAccountId
        ? generalAccounts?.find(
            (account) => account.id === parseInt(data.generalAccountId)
          )?.name
        : "",
    };

    try {
      setSubmitting(true);
      await axios.post("/api/accountOperations/", newData);
      if (generalAccount) router.push("/generalAccounts/" + generalAccount.id);
      else if (tiereAccount) router.push("/tiereAccounts/" + tiereAccount.id);
      else router.push("/");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("Une erreur inattendue s'est produite.");
    }
  });

  const defaultLabelle = () => {
    if (watch("tiereAccountId"))
      return tiereAccounts?.find(
        (account) => account.id === parseInt(watch("tiereAccountId") || "")
      )?.name;
    if (watch("generalAccountId"))
      return generalAccounts?.find(
        (account) => account.id === parseInt(watch("generalAccountId") || "")
      )?.name;
    return "";
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
            Compte général: {isGeneralAccountsLoading && <Spinner />}
          </Text>
          <Controller
            name="generalAccountId"
            control={control}
            render={({ field }) => (
              <SelectComponent
                data={generalAccounts || []}
                value={field.value}
                onValueChange={(newValue) => {
                  field.onChange(newValue);
                  setValue("tiereAccountId", "");
                }}
                placeholder="Compte général."
              />
            )}
          />
          <ErrorMessage>{errors.generalAccountId?.message}</ErrorMessage>
        </Flex>
        <Flex direction="column" width="100%" gap="2">
          <Text size="3" className="font-medium">
            Compte tiers: {isTiereAccountsLoading && <Spinner />}
          </Text>
          <Controller
            name="tiereAccountId"
            control={control}
            render={({ field }) => (
              <SelectComponent
                value={field.value || ""}
                onValueChange={field.onChange}
                placeholder="Compte tiers."
                data={filtredTiereAccounts || []}
              />
            )}
          />
          <ErrorMessage>{errors.tiereAccountId?.message}</ErrorMessage>
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
            libellé:
          </Text>
          <TextField.Root
            type="text"
            defaultValue={defaultLabelle()}
            placeholder="lebelle"
            className="mt-2"
            {...register("lebelle")}
          />
          <ErrorMessage>{errors.lebelle?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Sold débiteur:
          </Text>
          <TextField.Root
            type="number"
            placeholder="Sold débiteur."
            step="0.01"
            className="mt-2"
            {...register("debitSold")}
            disabled={watch("creditSold") ? true : false}
          />
          <ErrorMessage>{errors.debitSold?.message}</ErrorMessage>
        </div>
        <div>
          <Text size="3" className="font-medium">
            Sold créditeur:
          </Text>
          <TextField.Root
            type="number"
            placeholder="Sold créditeur."
            step="0.01"
            className="mt-2"
            {...register("creditSold")}
            disabled={watch("debitSold") ? true : false}
          />
          <ErrorMessage>{errors.creditSold?.message}</ErrorMessage>
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

const useGeneralAccounts = () =>
  useQuery<GeneralAccount[]>({
    queryKey: ["generalAccounts"],
    queryFn: () => axios.get("/api/generalAccounts").then((res) => res.data),
    retry: 3,
  });

const useTiereAccounts = () =>
  useQuery<TiereAccount[]>({
    queryKey: ["tiereAccounts"],
    queryFn: () => axios.get("/api/tiereAccounts").then((res) => res.data),
    retry: 3,
  });

export default AccountOperationForm;
