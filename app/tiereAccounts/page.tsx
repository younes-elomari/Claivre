import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import TiereAccountTable from "./TiereAccountTable";
import _ from "lodash";
import Pagination from "../components/Pagination";
import SearchComponent from "../components/SearchComponent";
import TiereAccountActions from "./TiereAccountActions";
import { getGeneralAccounts } from "../_utils/generalAccount/getGeneralAccounts";
import { getPaginatedTiereAccounts } from "../_utils/tiereAccount/getPaginatedTiereAccount";
import { getTiereAccountCount } from "../_utils/tiereAccount/getTiereAccountCount";
import { Metadata } from "next";

interface Props {
  searchParams: { generalAccountId: string; page: string; name: string };
}

const TiereAccountsPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const generalAccounts = await getGeneralAccounts();

  const ids = _(generalAccounts)
    .map((account) => account.id)
    .value();

  const generalAccountId = ids.includes(parseInt(searchParams.generalAccountId))
    ? parseInt(searchParams.generalAccountId)
    : undefined;

  const paginatedTiereAccounts = await getPaginatedTiereAccounts(
    generalAccountId,
    page,
    pageSize,
    searchParams.name,
    "asc"
  );

  const tiereAccountCount = await getTiereAccountCount(
    generalAccountId,
    searchParams.name
  );

  const generalAccountsForSelect = generalAccounts.map((account) => ({
    id: account.id,
    name: account.name,
  }));

  return (
    <Card>
      <Flex direction="column" gap="2">
        <TiereAccountActions generalAccounts={generalAccountsForSelect} />
        <SearchComponent />
        {paginatedTiereAccounts.length === 0 ? (
          <Card>
            <Heading size="5" className="text-gray-500 p-3">
              Aucan compte tiers.
            </Heading>
          </Card>
        ) : (
          <TiereAccountTable
            generalAccounts={generalAccounts}
            tiereAccounts={paginatedTiereAccounts}
          />
        )}
        <Pagination
          itemCount={tiereAccountCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Comptes des tiers",
  description:
    "**Page des Comptes Tiers** : Découvrez une gestion détaillée et efficace de vos comptes tiers, incluant clients, fournisseurs, employés et bien plus encore. Accédez rapidement aux transactions et opérations de chaque compte tiers pour une visibilité totale sur vos relations financières. Notre interface intuitive permet de suivre aisément les mouvements de chaque compte, offrant une vue d'ensemble claire et précise de votre activité. Avec des outils de recherche avancés, trouvez rapidement les informations dont vous avez besoin, sans tracas.",
};

export default TiereAccountsPage;
