import { Card, Flex, Heading } from "@radix-ui/themes";
import ProductListTable from "./ProductListTable";
import SearchComponent from "@/app/components/SearchComponent";
import Pagination from "@/app/components/Pagination";
import { getPaginatedProducts } from "@/app/_utils/product/getPaginatedProducts";
import { getProductsCount } from "@/app/_utils/product/getProductsCount";
import { Metadata } from "next";

const DashboardProductsPage = async ({
  searchParams,
}: {
  searchParams: { page: string; name: string };
}) => {
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
        <Heading size="4" className="text-gray-500">
          Liste des produits.
        </Heading>
        <SearchComponent />
        <ProductListTable products={paginatedProducts} />
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
  title: "Claivre - Produits list",
  description:
    "**Page des Produits** : Gérez vos produits avec une facilité déconcertante grâce à notre interface intuitive. Créez, modifiez et suivez plusieurs produits en un rien de temps. Notre plateforme vous permet de surveiller les stocks et les opérations de chaque produit, garantissant une gestion efficace et sans effort. Accédez aux informations détaillées de chaque produit, y compris le prix unitaire et le prix total, pour une meilleure visibilité et contrôle.",
};

export default DashboardProductsPage;
