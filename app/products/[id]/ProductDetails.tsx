import { Product } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  product: Product;
}

const ProductDetails = ({ product }: Props) => {
  return (
    <Card>
      <Flex direction="column" gap="3">
        <Text size="4" className="font-semibold text-gray-600">
          Stock:{" "}
          <span className="text-gray-500">{`${product?.stock.toLocaleString()} (${
            product?.unit
          })`}</span>
        </Text>
        <Text size="4" className="font-semibold text-gray-600">
          Prix moyen:{" "}
          {product?.purchasePrice && product?.stock && (
            <span className="text-gray-500">
              {isNaN(
                parseFloat(product?.purchasePrice.toString()) /
                  parseFloat(product?.stock.toString())
              )
                ? 0
                : (
                    parseFloat(product?.purchasePrice.toString()) /
                    parseFloat(product?.stock.toString())
                  ).toLocaleString()}
            </span>
          )}
        </Text>
        <Text size="4" className="font-semibold text-gray-600">
          Prix total:{" "}
          <span className="text-gray-500">
            {parseFloat(product?.purchasePrice.toString()).toLocaleString()}
          </span>
        </Text>
      </Flex>
    </Card>
  );
};

export default ProductDetails;
