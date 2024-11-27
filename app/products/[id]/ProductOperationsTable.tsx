import { ProductOperation } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import React from "react";
import ProductOperationDetailsDialog from "./ProductOperationDetailsDialog";
import DeleteProductOperationButton from "./DeleteProductOperationButton";

interface Props {
  productOperations: ProductOperation[];
}

const ProductOperationsTable = ({ productOperations }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              className="whitespace-nowrap border border-gray-500"
              key={column.value}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {productOperations.map((operation) => (
          <Table.Row key={operation.id}>
            <Table.Cell className="border border-gray-500">
              <ProductOperationDetailsDialog productOperation={operation} />
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {`${operation.date.getDate()}/${operation.date.getMonth() + 1}`}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(operation.unitPrice.toString()).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(
                  operation.purchaseQuantity.toString()
                ).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(
                  operation.purchasePrice.toString()
                ).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(operation.saleQuantity.toString()).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(operation.salePrice.toString()).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <DeleteProductOperationButton productOperationId={operation.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value?: keyof ProductOperation }[] = [
  { label: "" },
  { label: "Date", value: "date" },
  { label: "Prix Unitaire", value: "unitPrice" },
  { label: "Quantité d'achat", value: "purchaseQuantity" },
  { label: "Prix d'achat", value: "purchasePrice" },
  { label: "Quantité de vente", value: "saleQuantity" },
  { label: "Prix de vente", value: "salePrice" },
  { label: "" },
];

export default ProductOperationsTable;
