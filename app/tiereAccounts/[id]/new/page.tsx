import React from "react";
import { Card, Flex, Heading } from "@radix-ui/themes";
import AccountOperationForm from "@/app/accountOperations/new/AccountOperationForm";
import { getTiereAccount } from "@/app/_utils/tiereAccount/getTiereAccount";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

const NewTiereAccountOperationPage = async ({ params }: Props) => {
  const tiereAccount = await getTiereAccount(params.id);

  return (
    <Card>
      <Flex direction="column" gap="6">
        <Heading size="5">{`Ajouter de nouvelles opérations de ${tiereAccount?.name}.`}</Heading>
        <AccountOperationForm tiereAccount={tiereAccount} />
      </Flex>
    </Card>
  );
};

export async function generateMetadata({ params }: Props) {
  const tiereAccount = await getTiereAccount(params.id);

  return {
    title: "ajouter une opération pour " + tiereAccount?.name,
    description: "ajouter une opération pour le compte " + tiereAccount?.id,
  };
}

export default NewTiereAccountOperationPage;
