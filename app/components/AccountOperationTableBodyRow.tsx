import { AccountOperation, GeneralAccount, TiereAccount } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import React from "react";
import Link from "./Link";
import AccountOperationDetailsDialog from "./AccountOperationDetailsDialog";
import DeleteAccountOperationButton from "./DeleteAccountOperationButton";

interface Props {
  operation: AccountOperation;
  generalAccount: GeneralAccount | undefined;
  tiereAccount: TiereAccount | undefined;
}

const AccountOperationTableBodyRow = ({
  operation,
  generalAccount,
  tiereAccount,
}: Props) => {
  return (
    <Table.Row key={operation.id}>
      <Table.Cell className="border border-gray-500">
        <AccountOperationDetailsDialog
          accountOperation={operation}
          generalAccount={generalAccount}
          tiereAccount={tiereAccount}
        />
      </Table.Cell>
      <Table.Cell className="border border-gray-500">
        <Text className="whitespace-nowrap font-semibold text-gray-700">
          {`${operation.date.getDate()}/${operation.date.getMonth() + 1}`}
        </Text>
      </Table.Cell>
      <Table.Cell className="border border-gray-500">
        <Text className="font-semibold text-gray-700">{operation.lebelle}</Text>
      </Table.Cell>
      <Table.Cell className="border border-gray-500">
        <Text className="whitespace-nowrap font-semibold text-gray-700">
          <Link href={`/generalAccounts/${operation.generalAccountId}`}>
            {generalAccount?.name || ""}
          </Link>
        </Text>
      </Table.Cell>
      <Table.Cell className="border border-gray-500">
        <Text className="whitespace-nowrap font-semibold text-gray-700">
          <Link href={`/tiereAccounts/${operation.tiereAccountId}`}>
            {tiereAccount?.name || ""}
          </Link>
        </Text>
      </Table.Cell>
      <Table.Cell className="border border-gray-500">
        <Text className="font-semibold text-gray-700">
          {parseFloat(operation.debitSold.toString()).toLocaleString()}
        </Text>
      </Table.Cell>
      <Table.Cell className="border border-gray-500">
        <Text className="font-semibold text-gray-700">
          {parseFloat(operation.creditSold.toString()).toLocaleString()}
        </Text>
      </Table.Cell>
      <Table.Cell className="border border-gray-500">
        <DeleteAccountOperationButton accountOperationId={operation.id} />
      </Table.Cell>
    </Table.Row>
  );
};

export default AccountOperationTableBodyRow;
