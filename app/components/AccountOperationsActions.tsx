import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import OperationsMounthSelect from "./OperationsMounthSelect";
import { IoAddOutline } from "react-icons/io5";

interface Props {
  mounths: number[];
}

const AccountOperationsActions = ({ mounths }: Props) => {
  return (
    <Flex justify="between" gap="4">
      <Flex align="center" gap="2">
        <Heading size="2" className="text-gray-800">
          Tiere par mois
        </Heading>
        <OperationsMounthSelect url="/" mounths={mounths} />
      </Flex>
      <Button className="flex">
        <IoAddOutline />
        <Link href="/accountOperations/new">opération</Link>
      </Button>
    </Flex>
  );
};

export default AccountOperationsActions;
