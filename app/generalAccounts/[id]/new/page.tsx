import React from "react";
import { Card, Flex, Heading } from "@radix-ui/themes";
import AccountOperationForm from "@/app/accountOperations/new/AccountOperationForm";
import { getGeneralAccount } from "@/app/_utils/generalAccount/getGeneralAccount";

interface Props {
  params: Promise<{ id: string }>;
}

const NewGeneralAccountOperationPage = async ({ params }: Props) => {
  const generalAccount = await getGeneralAccount((await params).id);

  return (
    <Card>
      <Flex direction="column" gap="6">
        <Heading size="5">
          Ajouter de nouvelles opérations de comptes généraux.
        </Heading>
        <AccountOperationForm generalAccount={generalAccount} />
      </Flex>
    </Card>
  );
};

export async function generateMetadata({ params }: Props) {
  const generalAccount = await getGeneralAccount((await params).id);

  return {
    title: "ajouter une opération pour " + generalAccount?.name,
    description: "ajouter une opération pour le compte " + generalAccount?.id,
  };
}

export default NewGeneralAccountOperationPage;
