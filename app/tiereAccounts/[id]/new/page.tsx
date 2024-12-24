import { Card, Flex, Heading } from "@radix-ui/themes";
import AccountOperationForm from "@/app/accountOperations/new/AccountOperationForm";
import { getTiereAccount } from "@/app/_utils/tiereAccount/getTiereAccount";

interface Props {
  params: Promise<{ id: string }>;
}

const NewTiereAccountOperationPage = async ({ params }: Props) => {
  const tiereAccount = await getTiereAccount((await params).id);

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
  const tiereAccount = await getTiereAccount((await params).id);

  return {
    title: "ajouter une opération pour " + tiereAccount?.name,
    description: "ajouter une opération pour le compte " + tiereAccount?.id,
  };
}

export default NewTiereAccountOperationPage;
