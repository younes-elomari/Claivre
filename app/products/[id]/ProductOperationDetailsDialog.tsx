import { ProductOperation } from "@prisma/client";
import { Dialog, Flex, Button, Text } from "@radix-ui/themes";
import { FaRegEye } from "react-icons/fa6";
import React from "react";

interface Props {
  productOperation: ProductOperation;
}

const ProductOperationDetailsDialog = ({ productOperation }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft" size="1">
          <FaRegEye className="cursor-pointer" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex direction="column" gap="4" my="7">
          <Text size="4" className="font-medium text-gray-500">
            Date:{" "}
            <span className="font-semibold text-gray-700">
              {`${productOperation.date.getDate()}/${
                productOperation.date.getMonth() + 1
              }`}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Unit Price:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(
                productOperation.unitPrice.toString()
              ).toLocaleString()}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Purchase Quantity:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(
                productOperation.purchaseQuantity.toString()
              ).toLocaleString()}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Purchase Price:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(
                productOperation.purchasePrice.toString()
              ).toLocaleString()}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Sale Quantity:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(
                productOperation.saleQuantity.toString()
              ).toLocaleString()}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Sale Price:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(
                productOperation.salePrice.toString()
              ).toLocaleString()}
            </span>
          </Text>
        </Flex>
        <Dialog.Close>
          <Button color="gray">Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProductOperationDetailsDialog;
