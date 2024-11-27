import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import AccountOperationsActions from "./components/AccountOperationsActions";
import AccountOperationsTable from "./components/AccountOperationsTable";
import _ from "lodash";
import { ImCheckmark } from "react-icons/im";
import { FiX } from "react-icons/fi";
import Pagination from "./components/Pagination";
import moment from "moment";
import { getAccountOperations } from "./_utils/accountOperation/getAccountOperations";
import { getEndMounth, getStartMounth } from "./_utils/getMounth";
import { getPaginatedAccountOperations } from "./_utils/accountOperation/getPaginatedAccountOperations";
import { getAccountOperationsCount } from "./_utils/accountOperation/getAccountOperationsCount";
import { getGeneralAccounts } from "./_utils/generalAccount/getGeneralAccounts";
import { getTiereAccounts } from "./_utils/tiereAccount/getTiereAccounts";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./auth/authOptions";
import AlertDialog from "./components/AlertDialog";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string; mounth: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const session = await getServerSession(authOptions);

  const allAccountOperations = await getAccountOperations(
    undefined,
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
    undefined,
    undefined,
    "desc",
    startOfMounth,
    endOfMounth,
    page,
    pageSize
  );

  const accountOperationCount = await getAccountOperationsCount(
    undefined,
    undefined,
    startOfMounth,
    endOfMounth
  );

  const generalAccounts = await getGeneralAccounts();
  const tiereAccounts = await getTiereAccounts();

  const totalDebit = _.sumBy(
    generalAccounts.map((account) => parseFloat(account.debitSold.toString()))
  );
  const totalCredit = _.sumBy(
    generalAccounts.map((account) => parseFloat(account.creditSold.toString()))
  );
  const different = totalDebit - totalCredit;

  return (
    <Box className="space-y-4">
      {!session && <AlertDialog />}
      <Card>
        <Flex direction="column" gap="4">
          <Flex justify="between">
            <Heading size="5">Les opérations comptables.</Heading>
            {different !== 0 && (
              <Flex align="center">
                <Text size="3" className="text-red-500 font-semibold mx-2">
                  {different.toLocaleString()}
                </Text>
                <Button size="2" variant="soft" color="red">
                  <FiX />
                </Button>
              </Flex>
            )}
            {different === 0 && (
              <Button size="2" variant="soft" color="green">
                <ImCheckmark />
              </Button>
            )}
          </Flex>
          <Flex direction="column" gap="1">
            <Text className="font-semibold text-gray-700">
              Total débit: {totalDebit.toLocaleString()}
            </Text>
            <Text className="font-semibold text-gray-700">
              Total Crédit: {totalCredit.toLocaleString()}
            </Text>
          </Flex>
          <AccountOperationsActions mounths={mounths} />
          {accountOperations.length === 0 ? (
            <Card>
              <Heading size="5" className="text-gray-500 p-3">
                Aucune opération.
              </Heading>
            </Card>
          ) : (
            <AccountOperationsTable
              accountOperations={accountOperations}
              generalAccounts={generalAccounts}
              tiereAccounts={tiereAccounts}
            />
          )}
          <Pagination
            itemCount={accountOperationCount}
            pageSize={pageSize}
            currentPage={page}
          />
        </Flex>
      </Card>
    </Box>
  );
}

export const metadata: Metadata = {
  title: "Claivre - List des opérations",
  description:
    "Claivre est une solution complète et intuitive pour la gestion comptable. Avec Claivre, gérez facilement la comptabilité de votre entreprise, suivez les crédits de vos clients et surveillez le stock de vos produits. Notre plateforme est gratuite et conviviale, vous offrant des fonctionnalités avancées pour une gestion simplifiée de vos finances. Claivre transforme vos données en visualisations claires et impactantes telles que des graphiques linéaires et des histogrammes, facilitant ainsi l'analyse et la prise de décision. Bénéficiez d'une vue d'ensemble de vos finances avec des outils puissants et accessibles, conçus pour vous aider à prospérer.",
};
