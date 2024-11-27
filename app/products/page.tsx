import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ProductTable from "./ProductTable";
import ProductActions from "./ProductActions";
import Pagination from "../components/Pagination";
import SearchComponent from "../components/SearchComponent";
import { getPaginatedProducts } from "../_utils/product/getPaginatedProducts";
import { getProductsCount } from "../_utils/product/getProductsCount";
import { Metadata } from "next";

interface Props {
  searchParams: { page: string; name: string };
}

const ProductsPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const paginatedProducts = await getPaginatedProducts(
    page,
    pageSize,
    searchParams.name,
    "asc"
  );

  const productCount = await getProductsCount(searchParams.name);

  return (
    <Card>
      <Flex direction="column" gap="4">
        <Flex justify="between">
          <Heading size="5">Les produits en stock.</Heading>
          <ProductActions />
        </Flex>
        <SearchComponent />
        {paginatedProducts.length === 0 ? (
          <Card>
            <Heading size="5" className="text-gray-500 p-3">
              Aucun produit.
            </Heading>
          </Card>
        ) : (
          <ProductTable products={paginatedProducts} />
        )}
        <Pagination
          itemCount={productCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Card>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Produits",
  description:
    "**Page des Produits** : Gérez vos produits avec une facilité déconcertante grâce à notre interface intuitive. Créez, modifiez et suivez plusieurs produits en un rien de temps. Notre plateforme vous permet de surveiller les stocks et les opérations de chaque produit, garantissant une gestion efficace et sans effort. Accédez aux informations détaillées de chaque produit, y compris le prix unitaire et le prix total, pour une meilleure visibilité et contrôle.",
};

export default ProductsPage;
