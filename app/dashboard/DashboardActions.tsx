import { Box, DropdownMenu, Flex, Button } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

const DashboardActions = () => {
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button className="cursor-pointer">
            Items <AiOutlineMenu />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Link href="/dashboard">
              <Flex align="center" gap="2">
                Panneaux de controle
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard/products">
              <Flex align="center" gap="2">
                List des produits
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard/generalAccounts">
              <Flex align="center" gap="2">
                List des comptes généraux
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard/tiereAccounts">
              <Flex align="center" gap="2">
                List des comptes tiers
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard/user">
              <Flex align="center" gap="2">
                Utilisateur
              </Flex>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default DashboardActions;
