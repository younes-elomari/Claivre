import { AccountOperation, GeneralAccount, TiereAccount } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import AccountOperationTableBodyRow from "./AccountOperationTableBodyRow";

interface Props {
  generalAccounts: GeneralAccount[];
  accountOperations: AccountOperation[];
  tiereAccounts: TiereAccount[];
}

const AccountOperationsTable = ({
  accountOperations,
  generalAccounts,
  tiereAccounts,
}: Props) => {
  const getAccountGeneral = (id: number) => {
    return generalAccounts.find((account) => account.id === id);
  };
  const getAccountTiere = (id: number | null) => {
    return tiereAccounts.find((account) => account.id === id);
  };
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column, index) => (
            <Table.ColumnHeaderCell
              className="whitespace-nowrap border border-gray-500"
              key={index}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {accountOperations.map((operation) => (
          <AccountOperationTableBodyRow
            key={operation.id}
            operation={operation}
            generalAccount={getAccountGeneral(operation.generalAccountId)}
            tiereAccount={getAccountTiere(operation.tiereAccountId)}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value?: keyof AccountOperation }[] = [
  { label: "Afficher" },
  { label: "Date", value: "date" },
  { label: "Libellé", value: "lebelle" },
  { label: "C-Général", value: "generalAccountId" },
  { label: "C-Tier", value: "tiereAccountId" },
  { label: "Débit", value: "debitSold" },
  { label: "Crédit", value: "creditSold" },
  { label: "Supprimer" },
];

export default AccountOperationsTable;
