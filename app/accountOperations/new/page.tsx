import React from "react";
import AccountOperationForm from "./AccountOperationForm";
import { Callout, Card, Flex, Heading } from "@radix-ui/themes";
import { getGeneralAccountsCount } from "@/app/_utils/generalAccount/getGenerallAccountsCount";
import { Metadata } from "next";

const NewAccountOperationPage = async () => {
  const generalAccountsCount = await getGeneralAccountsCount();

  return (
    <Card>
      {generalAccountsCount === 0 && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>D&apos;abord, tu doit créer un compte général.</Callout.Text>
        </Callout.Root>
      )}
      <Flex direction="column" gap="6">
        <Heading size="5">Ajouter de nouvelles opérations.</Heading>
        <AccountOperationForm />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Nouvelles opérations",
  description:
    "**Page d'Ajout des Opérations** : Simplifiez la gestion de vos finances en ajoutant des opérations et des transactions facilement. Sur cette page, vous pouvez enregistrer des opérations pour vos comptes clients, fournisseurs, employés et plus encore, garantissant une gestion précise et efficace de vos finances.",
};

export default NewAccountOperationPage;
