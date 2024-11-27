"use client";
import {
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { AiOutlineBank } from "react-icons/ai";
import { TbBuildingBank } from "react-icons/tb";
import { GiHistogram } from "react-icons/gi";
import { RiProductHuntLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import Spinner from "./components/Spinner";
import Image from "next/image";
import balance from "@/public/balance.svg";

const NavBar = () => {
  const { status } = useSession();

  return (
    <nav className="border-b mb-4 px-4 py-2">
      <Container>
        <Flex justify="between" align="center">
          <Link href="/">
            <Image src={balance} alt="Balance logo" height={25} />
          </Link>
          <Flex align="center" gap="2">
            {status === "loading" && <Spinner />}
            {status === "unauthenticated" && (
              <Button variant="outline" className="cursor-pointer">
                <Link href="/register">Enregistrer</Link>
              </Button>
            )}
            {status === "unauthenticated" && (
              <Button variant="outline" className="cursor-pointer">
                <Link href="/api/auth/signin">Connexion</Link>
              </Button>
            )}
            <DropDownMenu />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const DropDownMenu = () => {
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="gray" variant="outline">
            <AiOutlineMenu className="cursor-pointer" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Link href="/">
              <Flex align="center" gap="2">
                <GoHome />
                Home
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/products">
              <Flex align="center" gap="2">
                <RiProductHuntLine />
                Produits
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/generalAccounts">
              <Flex align="center" gap="2">
                <AiOutlineBank />
                Comptes généraux
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/tiereAccounts">
              <Flex align="center" gap="2">
                <TbBuildingBank />
                Comptes tiers
              </Flex>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/dashboard">
              <Flex align="center" gap="2">
                <GiHistogram />
                Tableau de Bord
              </Flex>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
