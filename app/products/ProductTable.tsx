import { Product } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import Link from "../components/Link";

interface Props {
  products: Product[];
}

const ProductTable = ({ products }: Props) => {
  return (
    <Table.Root>
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
              <Text className="font-semibold whitespace-nowrap">
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700">
                {product.unit}
              </Text>
            </Table.Cell>
            <Table.Cell className="border border-gray-500">
              <Text className="font-semibold text-gray-700  whitespace-nowrap">
                {parseFloat(product.stock.toString()).toLocaleString()}
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
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value?: keyof Product }[] = [
  { label: "Nom", value: "name" },
  { label: "Unité", value: "unit" },
  { label: "Stock", value: "stock" },
  { label: "Prix moyen" },
  { label: "Prix total", value: "purchasePrice" },
];

export default ProductTable;
