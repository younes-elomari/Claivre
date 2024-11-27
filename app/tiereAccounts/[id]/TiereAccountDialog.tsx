import { TiereAccount } from "@prisma/client";
import {
  Dialog,
  Heading,
  Separator,
  Flex,
  Button,
  Text,
} from "@radix-ui/themes";

interface Props {
  tiereAccount: TiereAccount;
}

const TiereAccountDialog = ({ tiereAccount }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Heading size="5" className="text-violet-600 cursor-pointer">
          {tiereAccount?.name}
        </Heading>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{tiereAccount.name}</Dialog.Title>
        <Separator />
        <Flex direction="column" gap="4" my="7">
          <Text size="5" className="font-medium text-gray-500">
            Total débit:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(tiereAccount.debitSold.toString()).toLocaleString()}
            </span>
          </Text>
          <Text size="5" className="font-medium text-gray-500">
            Total crédit:{" "}
            <span className="font-semibold text-gray-700">
              {parseFloat(tiereAccount.creditSold.toString()).toLocaleString()}
            </span>
          </Text>
          <Text size="5" className="font-medium text-gray-500">
            Sold:{" "}
            <span className="font-semibold text-gray-700">
              {(
                parseFloat(tiereAccount.debitSold.toString()) -
                parseFloat(tiereAccount.creditSold.toString())
              ).toLocaleString()}
            </span>
          </Text>
          <Text size="5" className="font-medium text-gray-500">
            Email:{" "}
            <span className="font-semibold text-gray-700">
              {tiereAccount.email}
            </span>
          </Text>
          <Text size="5" className="font-medium text-gray-500">
            Téléphone:{" "}
            <span className="font-semibold text-gray-700">
              {tiereAccount.phone}
            </span>
          </Text>
          <Text size="5" className="font-medium text-gray-500">
            Adresse:{" "}
            <span className="font-semibold text-gray-700">
              {tiereAccount.address}
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

export default TiereAccountDialog;
