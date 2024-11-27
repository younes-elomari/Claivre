import AccountOperationsTable from "@/app/components/AccountOperationsTable";
import { Card, Flex, Heading, Button } from "@radix-ui/themes";
import { IoAddOutline } from "react-icons/io5";
import GeneralAccountDetails from "./GeneralAccountDetails";
import Link from "next/link";
import LineChartComponent from "@/app/components/LineChartComponent";
import Pagination from "@/app/components/Pagination";
import OperationsMounthSelect from "@/app/components/OperationsMounthSelect";
import _ from "lodash";
import moment from "moment";
import { getGeneralAccount } from "@/app/_utils/generalAccount/getGeneralAccount";
import { getTiereAccounts } from "@/app/_utils/tiereAccount/getTiereAccounts";
import { getAccountOperations } from "@/app/_utils/accountOperation/getAccountOperations";
import { getPaginatedAccountOperations } from "@/app/_utils/accountOperation/getPaginatedAccountOperations";
import { getAccountOperationsCount } from "@/app/_utils/accountOperation/getAccountOperationsCount";
import { getEndMounth, getStartMounth } from "@/app/_utils/getMounth";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
  searchParams: { page: string; mounth: string };
}

const GeneralAccountDetailsPage = async ({ params, searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const generalAccount = await getGeneralAccount(params.id);

  const tiereAccounts = await getTiereAccounts(generalAccount?.id);

  const allAccountOperations = await getAccountOperations(
    generalAccount?.id,
    undefined,
    "asc"
  );

  const mounths = _(allAccountOperations)
    .map((o) => moment(o.date).month() + 1)
    .uniq()
    .value();

  const mounth = mounths.includes(parseInt(searchParams.mounth))
    ? parseInt(searchParams.mounth)
    : undefined;

  const startOfMounth = getStartMounth(mounth);
  const endOfMounth = getEndMounth(mounth);

  const accountOperations = await getPaginatedAccountOperations(
    generalAccount?.id,
    undefined,
    "desc",
    startOfMounth,
    endOfMounth,
    page,
    pageSize
  );

  const accountOperationsCount = await getAccountOperationsCount(
    generalAccount?.id,
    undefined,
    startOfMounth,
    endOfMounth
  );

  const lineChartOperations = allAccountOperations.map((account) => ({
    date: `${account.date.getMonth() + 1}/${account.date.getFullYear()}`,
    debit: parseFloat(account.debitSold.toString()),
    credit: parseFloat(account.creditSold.toString()),
  }));

  if (!generalAccount) return null;

  return (
    <Card>
      <Flex direction="column" gap="4">
        <Flex justify="between">
          <Heading size="5">{generalAccount?.name}</Heading>
          <Button className="flex">
            <IoAddOutline />
            <Link href={`/generalAccounts/${generalAccount.id}/new`}>
              opération
            </Link>
          </Button>
        </Flex>
        <GeneralAccountDetails generalAccount={generalAccount} />
        <OperationsMounthSelect
          url={`/generalAccounts/${generalAccount.id}`}
          mounths={mounths}
        />
        {accountOperations.length === 0 ? (
          <Card>
            <Heading size="5" className="text-gray-500 p-3">
              {`${generalAccount.name} n'a pas d'opérations.`}
            </Heading>
          </Card>
        ) : (
          <AccountOperationsTable
            generalAccounts={[generalAccount]}
            tiereAccounts={tiereAccounts}
            accountOperations={accountOperations}
          />
        )}
        <Pagination
          itemCount={accountOperationsCount}
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
  const generalAccount = await getGeneralAccount(params.id);

  return {
    title: generalAccount?.name,
    description: "détails du compte général " + generalAccount?.id,
  };
}

export default GeneralAccountDetailsPage;
