import { Card, Flex, Heading } from "@radix-ui/themes";
import GeneralAccountActions from "./GeneralAccountActions";
import GeneralAccountTable from "./GeneralAccountTable";
import Pagination from "../components/Pagination";
import SearchComponent from "../components/SearchComponent";
import { getPaginatedGeneralAccounts } from "../_utils/generalAccount/getPaginatedGeneralAccounts";
import { getGeneralAccountsCount } from "../_utils/generalAccount/getGenerallAccountsCount";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ page: string; name: string }>;
}

const GeneralAccountsPage = async ({ searchParams }: Props) => {
  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10;

  const paginatedGeneralAccounts = await getPaginatedGeneralAccounts(
    page,
    pageSize,
    (await searchParams).name
  );

  const generalAccountsCount = await getGeneralAccountsCount((await searchParams).name);

  return (
    <Card>
      <Flex direction="column" gap="4">
        <Flex justify="between">
          <Heading size="5">Comptes généraux.</Heading>
          <GeneralAccountActions />
        </Flex>
        <SearchComponent />
        {paginatedGeneralAccounts.length === 0 ? (
          <Card>
            <Heading size="5" className="text-gray-500 p-3">
              Aucan comptes général.
            </Heading>
          </Card>
        ) : (
          <GeneralAccountTable generalAccounts={paginatedGeneralAccounts} />
        )}
        <Pagination
          itemCount={generalAccountsCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Comptes généraux",
  description:
    "**Page des Comptes Généraux** : Votre portail pour une gestion financière détaillée et précise. Visualisez les soldes et les mouvements de chaque compte général, le tout en un clin d'œil. Grâce à notre fonctionnalité de recherche avancée, trouvez facilement les comptes que vous recherchez, sans perdre de temps. Suivez les transactions à travers des graphiques linéaires clairs et intuitifs, qui affichent les mouvements financiers selon leur date. Analysez vos flux financiers avec une précision inégalée et prenez des décisions éclairées.",
};

export default GeneralAccountsPage;
