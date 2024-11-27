import { Product } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import DeleteProductButton from "./DeleteProductButton";

interface Props {
  products: Product[];
}

const ProductListTable = ({ products }: Props) => {
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
        {products.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell className="border border-gray-500">
              <Text
                size="3"
                className="font-semibold text-gray-800 whitespace-nowrap"
              >
                {product.name}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700 whitespace-nowrap">
                {`${parseFloat(product.stock.toString()).toLocaleString()} (${
                  product.unit
                })`}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {Number.isNaN(
                  parseFloat(product.purchasePrice.toString()) /
                    parseFloat(product.stock.toString())
                )
                  ? 0
                  : (
                      parseFloat(product.purchasePrice.toString()) /
                      parseFloat(product.stock.toString())
                    ).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {parseFloat(product.purchasePrice.toString()).toLocaleString()}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500 text-center">
              <DeleteProductButton productId={product.id} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value?: keyof Product }[] = [
  { label: "Nom", value: "name" },
  { label: "Stock", value: "stock" },
  { label: "Prix moyen" },
  { label: "Prix total", value: "purchasePrice" },
  { label: "Effacer" },
];

export default ProductListTable;
