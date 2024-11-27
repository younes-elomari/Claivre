import { GeneralAccount } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  generalAccount: GeneralAccount;
}

const GeneralAccountDetails = ({ generalAccount }: Props) => {
  return (
    <Card>
      <Flex direction="column" gap="3">
        <Text size="4" className="font-semibold text-gray-600">
          Total débit:{" "}
          <span className="text-gray-500">
            {parseFloat(generalAccount.debitSold.toString()).toLocaleString()}
          </span>
        </Text>
        <Text size="4" className="font-semibold text-gray-600">
          Total crédit:{" "}
          <span className="text-gray-500">
            {parseFloat(generalAccount.creditSold.toString()).toLocaleString()}
          </span>
        </Text>
        <Text size="4" className="font-semibold text-gray-600">
          Sold:{" "}
          <span className="text-gray-500">
            {(
              parseFloat(generalAccount.debitSold.toString()) -
              parseFloat(generalAccount.creditSold.toString())
            ).toLocaleString()}
          </span>
        </Text>
      </Flex>
    </Card>
  );
};

export default GeneralAccountDetails;
