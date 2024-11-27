import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ProductForm from "./ProductForm";
import { Metadata } from "next";

const NewProductPage = () => {
  return (
    <Card>
      <Flex direction="column" gap="6">
        <Heading size="5">Ajouter de nouveaux produits.</Heading>
        <ProductForm />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Nouveau produit",
  description:
    "La création d'un nouveau produit est une fonctionnalité essentielle pour une gestion comptable précise et organisée. Avec **Claivre**, vous pouvez ajouter facilement de nouveaux produits et suivre leurs transactions.",
};

export default NewProductPage;
