import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import GeneralAccountIdSelect from "../components/GeneralAccountIdSelect";

interface Props {
  generalAccounts: { id: number; name: string }[];
}

const TiereAccountActions = ({ generalAccounts }: Props) => {
  return (
    <Box className="space-y-3">
      <Flex justify="between">
        <Heading size="5">Comptes des tiers.</Heading>
        <Button className="flex">
          <IoAddOutline />
          <Link href="/tiereAccounts/new">c-tiers</Link>
        </Button>
      </Flex>
      <GeneralAccountIdSelect
        url="/tiereAccounts"
        generalAccounts={generalAccounts}
      />
    </Box>
  );
};

export default TiereAccountActions;
