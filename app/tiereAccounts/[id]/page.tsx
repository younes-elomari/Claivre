import AccountOperationsTable from "@/app/components/AccountOperationsTable";
import { Card, Flex, Heading, Button } from "@radix-ui/themes";
import { IoAddOutline } from "react-icons/io5";
import TiereAccountDetails from "./TiereAccountDetails";
import TiereAccountDialog from "./TiereAccountDialog";
import Link from "next/link";
import LineChartComponent from "@/app/components/LineChartComponent";
import Pagination from "@/app/components/Pagination";
import { getTiereAccount } from "@/app/_utils/tiereAccount/getTiereAccount";
import { getGeneralAccount } from "@/app/_utils/generalAccount/getGeneralAccount";
import { getPaginatedAccountOperations } from "@/app/_utils/accountOperation/getPaginatedAccountOperations";
import { getAccountOperations } from "@/app/_utils/accountOperation/getAccountOperations";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string }>;
}

const TiereAccountDetailsPage = async ({ params, searchParams }: Props) => {
  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10;

  const tiereAccount = await getTiereAccount((await params).id);

  if (!tiereAccount) return null;

  const generalAccount = await getGeneralAccount(
    tiereAccount.generalAccountId.toString()
  );

  const paginatedAccountOperations = await getPaginatedAccountOperations(
    generalAccount?.id,
    tiereAccount.id,
    "desc",
    undefined,
    undefined,
    page,
    pageSize
  );

  const allAccountOperations = await getAccountOperations(
    generalAccount?.id,
    tiereAccount.id,
    "asc"
  );

  const lineChartOperations = allAccountOperations.map((account) => ({
    date: `${account.date.getMonth() + 1}/${account.date.getFullYear()}`,
    debit: parseFloat(account.debitSold.toString()),
    credit: parseFloat(account.creditSold.toString()),
  }));

  return (
    <Card>
      <Flex direction="column" gap="4">
        <Flex justify="between">
          <TiereAccountDialog tiereAccount={tiereAccount} />
          <Button className="flex">
            <IoAddOutline />
            <Link href={`/tiereAccounts/${tiereAccount.id}/new`}>
              operation
            </Link>
          </Button>
        </Flex>
        <TiereAccountDetails tiereAccount={tiereAccount} />
        {paginatedAccountOperations.length === 0 ? (
          <Card>
            <Heading size="5" className="text-gray-500 p-3">
              {`${tiereAccount.name} n'a pas d'opérations.`}
            </Heading>
          </Card>
        ) : (
          <AccountOperationsTable
            generalAccounts={[generalAccount!]}
            tiereAccounts={[tiereAccount]}
            accountOperations={paginatedAccountOperations}
          />
        )}
        <Pagination
          itemCount={allAccountOperations.length}
          pageSize={pageSize}
          currentPage={page}
        />
        <LineChartComponent
          data={lineChartOperations}
          XAxisKey="date"
          FirstLineKey="debit"
          SecondLineKey="credit"
        />
      </Flex>
    </Card>
  );
};

export async function generateMetadata({ params }: Props) {
  const tiereAccount = await getTiereAccount((await params).id);

  return {
    title: tiereAccount?.name,
    description: "détails du compte général " + tiereAccount?.id,
  };
}

export default TiereAccountDetailsPage;
