import React from "react";
import GeneralAccountForm from "./GeneralAccountForm";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { Metadata } from "next";

const NewGeneralAccountPage = () => {
  return (
    <Card>
      <Flex direction="column" gap="6">
        <Heading size="5">Ajouter de nouveaux comptes généraux.</Heading>
        <GeneralAccountForm />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Nouveau compte général",
  description:
    "La création d'un nouveau compte général est une fonctionnalité essentielle pour une gestion comptable précise et organisée. Avec **Claivre**, vous pouvez ajouter facilement de nouveaux comptes généraux et suivre leurs transactions.",
};

export default NewGeneralAccountPage;
