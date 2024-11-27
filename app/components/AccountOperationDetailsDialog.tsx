import { AccountOperation, GeneralAccount, TiereAccount } from "@prisma/client";
import { Dialog, Flex, Button, Text } from "@radix-ui/themes";
import { FaRegEye } from "react-icons/fa6";
import React from "react";

interface Props {
  accountOperation: AccountOperation;
  generalAccount: GeneralAccount | undefined;
  tiereAccount: TiereAccount | undefined;
}

const AccountOperationDetailsDialog = ({
  accountOperation,
  generalAccount,
  tiereAccount,
}: Props) => {
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
              {`${accountOperation.date.getDate()}/${
                accountOperation.date.getMonth() + 1
              }`}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Temps:{" "}
            <span className="font-semibold text-gray-700">
              {`${accountOperation.date.getHours()}:${accountOperation.date.getMinutes()}`}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Libellé:{" "}
            <span className="font-semibold text-gray-700">
              {accountOperation.lebelle}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Compte général:{" "}
            <span className="font-semibold text-gray-700">
              {generalAccount?.name}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Compte de tiers:{" "}
            <span className="font-semibold text-gray-700">
              {tiereAccount?.name}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Mouvement débit:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(
                accountOperation.debitSold.toString()
              ).toLocaleString()}
            </span>
          </Text>
          <Text size="4" className="font-medium text-gray-500">
            Mouvement crédit:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(
                accountOperation.creditSold.toString()
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

export default AccountOperationDetailsDialog;
