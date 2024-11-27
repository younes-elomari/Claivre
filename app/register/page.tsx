import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import RegisterForm from "./RegisterForm";
import { Metadata } from "next";

const RegisterPage = () => {
  return (
    <Card className="max-w-xl m-auto">
      <Flex className="my-5 mx-3" direction="column" gap="4">
        <Heading size="5" className="text-gray-600 text-center">
          Mettons-nous en place.
        </Heading>
        <Text size="4" className="text-gray-500 font-medium">
          Cela ne devrait prendre que quelques minutes pour se synchroniser avec
          votre montre.
        </Text>
        <RegisterForm />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Inscription",
  description:
    "**Page d'Inscription** : Rejoignez-nous dès aujourd'hui et accédez à toutes les fonctionnalités que nous proposons. Inscrivez-vous en quelques étapes simples et commencez à profiter d'une gestion comptable complète et intuitive.",
};

export default RegisterPage;
