import { GeneralAccount } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import DeleteGeneralAccountButton from "./DeleteGeneralAccountButton";

interface Props {
  generalAccounts: GeneralAccount[];
}

const GeneralAccountListTable = ({ generalAccounts }: Props) => {
  return (
    <Table.Root variant="ghost">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              className="whitespace-nowrap border border-gray-500"
              key={column.label}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {generalAccounts.map((account) => (
          <Table.Row key={account.id}>
            <Table.Cell className="border border-gray-500">
              <Text
                size="3"
                className="font-semibold text-gray-800 whitespace-nowrap"
              >
                {account.name}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(account.debitSold.toString()).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(account.creditSold.toString()).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(account.debitSold.toString()) -
                  parseFloat(account.creditSold.toString()) >
                0
                  ? (
                      parseFloat(account.debitSold.toString()) -
                      parseFloat(account.creditSold.toString())
                    ).toLocaleString()
                  : 0}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(account.debitSold.toString()) -
                  parseFloat(account.creditSold.toString()) <
                0
                  ? (
                      (parseFloat(account.debitSold.toString()) -
                        parseFloat(account.creditSold.toString())) *
                      -1
                    ).toLocaleString()
                  : 0}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500 text-center">
              <DeleteGeneralAccountButton generalAccountId={account.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value?: keyof GeneralAccount }[] = [
  { label: "Nom", value: "name" },
  { label: "Total débit", value: "debitSold" },
  { label: "Total crédit", value: "creditSold" },
  { label: "Sold débiteur" },
  { label: "Sold créditeur" },
  { label: "Effacer" },
];

export default GeneralAccountListTable;
