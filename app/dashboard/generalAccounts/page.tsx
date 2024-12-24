import { Card, Flex, Heading } from "@radix-ui/themes";
import GeneralAccountListTable from "./GeneralAccountListTable";
import SearchComponent from "@/app/components/SearchComponent";
import Pagination from "@/app/components/Pagination";
import { getPaginatedGeneralAccounts } from "@/app/_utils/generalAccount/getPaginatedGeneralAccounts";
import { getGeneralAccountsCount } from "@/app/_utils/generalAccount/getGenerallAccountsCount";
import { Metadata } from "next";

const DashboardGeneralAccountsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; name: string }>;
}) => {
  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10;

  const generalAccounts = await getPaginatedGeneralAccounts(
    page,
    pageSize,
    (await searchParams).name
  );

  const generalAccountCount = await getGeneralAccountsCount((await searchParams).name);

  return (
    <Card>
      <Flex direction="column" gap="4">
        <Heading size="4" className="text-gray-500">
          List des comptes généraux.
        </Heading>
        <SearchComponent />
        <GeneralAccountListTable generalAccounts={generalAccounts} />
        <Pagination
          itemCount={generalAccountCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Comptes généraux list",
  description:
    "**Page des Comptes Généraux** : Votre portail pour une gestion financière détaillée et précise. Visualisez les soldes et les mouvements de chaque compte général, le tout en un clin d'œil. Grâce à notre fonctionnalité de recherche avancée, trouvez facilement les comptes que vous recherchez, sans perdre de temps. Suivez les transactions à travers des graphiques linéaires clairs et intuitifs, qui affichent les mouvements financiers selon leur date. Analysez vos flux financiers avec une précision inégalée et prenez des décisions éclairées.",
};

export default DashboardGeneralAccountsPage;
