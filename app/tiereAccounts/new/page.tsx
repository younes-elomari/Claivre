import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import TiereAccountForm from "./TiereAccountForm";
import { Metadata } from "next";

const NewTiereAccountPage = () => {
  return (
    <Card>
      <Flex direction="column" gap="6">
        <Heading size="5">Ajouter de nouveaux comptes de tiers.</Heading>
        <TiereAccountForm />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Nouveau compte des tiers",
  description:
    "La création d'un nouveau compte des tiers est une fonctionnalité essentielle pour une gestion comptable précise et organisée. Avec **Claivre**, vous pouvez ajouter facilement de nouveaux comptes des tiers et suivre leurs transactions.",
};

export default NewTiereAccountPage;
