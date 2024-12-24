import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import TiereAccountListTable from "./TiereAccountListTable";
import _ from "lodash";
import SearchComponent from "@/app/components/SearchComponent";
import Pagination from "@/app/components/Pagination";
import GeneralAccountIdSelect from "@/app/components/GeneralAccountIdSelect";
import { getGeneralAccounts } from "@/app/_utils/generalAccount/getGeneralAccounts";
import { getPaginatedTiereAccounts } from "@/app/_utils/tiereAccount/getPaginatedTiereAccount";
import { getTiereAccountCount } from "@/app/_utils/tiereAccount/getTiereAccountCount";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{
    generalAccountId: string;
    page: string;
    name: string;
  }>;
}

const DashboardTiereAccountsPage = async ({ searchParams }: Props) => {
  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10;

  const generalAccounts = await getGeneralAccounts();

  const ids = _(generalAccounts)
    .map((account) => account.id)
    .value();

  const generalAccountId = ids.includes(
    parseInt((await searchParams).generalAccountId)
  )
    ? parseInt((await searchParams).generalAccountId)
    : undefined;

  const paginatedTiereAccounts = await getPaginatedTiereAccounts(
    generalAccountId,
    page,
    pageSize,
    (
      await searchParams
    ).name,
    "asc"
  );

  const tiereAccountCount = await getTiereAccountCount(
    generalAccountId,
    (
      await searchParams
    ).name
  );

  const generalAccountsForSelect = generalAccounts.map((account) => ({
    id: account.id,
    name: account.name,
  }));

  return (
    <Card>
      <Flex direction="column" gap="3">
        <Heading size="4" className="text-gray-500 mb-4">
          List des comptes des tiers.
        </Heading>
        <GeneralAccountIdSelect
          url="/dashboard/tiereAccounts"
          generalAccounts={generalAccountsForSelect}
        />
        <SearchComponent />
        {paginatedTiereAccounts.length === 0 ? (
          <Card>
            <Heading size="4" className="text-gray-500 p-3">
              There is no Tiere Accounts.
            </Heading>
          </Card>
        ) : (
          <TiereAccountListTable
            tiereAccounts={paginatedTiereAccounts}
            generalAccounts={generalAccounts}
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
  title: "Claivre - Comptes des tiers list",
  description:
    "**Page des Comptes Tiers** : Découvrez une gestion détaillée et efficace de vos comptes tiers, incluant clients, fournisseurs, employés et bien plus encore. Accédez rapidement aux transactions et opérations de chaque compte tiers pour une visibilité totale sur vos relations financières. Notre interface intuitive permet de suivre aisément les mouvements de chaque compte, offrant une vue d'ensemble claire et précise de votre activité. Avec des outils de recherche avancés, trouvez rapidement les informations dont vous avez besoin, sans tracas.",
};

export default DashboardTiereAccountsPage;
