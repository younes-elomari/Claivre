import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ProductOperationForm from "./ProductOperationForm";
import { getProduct } from "@/app/_utils/product/getProduct";

interface Props {
  params: Promise<{ id: string }>;
}

const NewProductOperationPage = () => {
  return (
    <Card>
      <Flex direction="column" gap="6">
        <Heading size="5">Ajouter de nouvelles opérations de produit.</Heading>
        <ProductOperationForm />
      </Flex>
    </Card>
  );
};

export async function generateMetadata({ params }: Props) {
  const produit = await getProduct((await params).id);

  return {
    title: "ajouter une opération pour " + produit?.name,
    description: "ajouter une opération pour le produit " + produit?.id,
  };
}

export default NewProductOperationPage;
