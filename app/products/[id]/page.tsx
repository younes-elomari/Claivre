import prisma from "@/prisma/client";
import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ProductDetails from "./ProductDetails";
import ProductOperationsTable from "./ProductOperationsTable";
import Link from "next/link";
import Pagination from "@/app/components/Pagination";
import _ from "lodash";
import moment from "moment";
import OperationsMounthSelect from "@/app/components/OperationsMounthSelect";
import LineChartComponent from "@/app/components/LineChartComponent";
import { IoAddOutline } from "react-icons/io5";
import { getProduct } from "@/app/_utils/product/getProduct";
import { getProductOperations } from "@/app/_utils/productOperation/getProductOperations";
import { getEndMounth, getStartMounth } from "@/app/_utils/getMounth";
import { getPaginatedProductOperations } from "@/app/_utils/productOperation/getPaginatedProductOperations";
import { getProductOperationCount } from "@/app/_utils/productOperation/getProductOperationCount";

interface Props {
  params: { id: string };
  searchParams: { page: string; mounth: string };
}

const ProductDetailsPage = async ({ params, searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const product = await getProduct(params.id);

  if (!product) return null;

  const allProductOperations = await getProductOperations(product.id, "asc");

  const mounths = _(allProductOperations)
    .map((o) => moment(o.date).month() + 1)
    .uniq()
    .value();

  const mounth = mounths.includes(parseInt(searchParams.mounth))
    ? parseInt(searchParams.mounth)
    : undefined;

  const startOfMounth = getStartMounth(mounth);
  const endOfMounth = getEndMounth(mounth);

  const productOperations = await getPaginatedProductOperations(
    product.id,
    "desc",
    startOfMounth,
    endOfMounth,
    page,
    pageSize
  );

  const lineChartOperations = allProductOperations.map((operation) => ({
    date: `${operation.date.getMonth() + 1}/${operation.date.getFullYear()}`,
    debit: parseFloat(operation.purchaseQuantity.toString()),
    credit: parseFloat(operation.saleQuantity.toString()),
  }));

  const productOperationCount = await getProductOperationCount(
    product.id,
    startOfMounth,
    endOfMounth
  );

  return (
    <Card>
      <Flex direction="column" gap="4">
        <Flex justify="between">
          <Heading size="5">{product?.name}</Heading>
          <Button className="flex">
            <IoAddOutline />
            <Link href={`/products/${params.id}/new`}>Operation</Link>
          </Button>
        </Flex>
        <ProductDetails product={product} />
        <OperationsMounthSelect
          url={`/products/${params.id}`}
          mounths={mounths}
        />
        {productOperations.length === 0 ? (
          <Card>
            <Heading size="5" className="text-gray-500 p-3">
              Aucune opération.
            </Heading>
          </Card>
        ) : (
          <ProductOperationsTable productOperations={productOperations} />
        )}
        <Pagination
          itemCount={productOperationCount}
          pageSize={pageSize}
          currentPage={page}
        />
        <LineChartComponent
          data={lineChartOperations}
          FirstLineKey="debit"
          SecondLineKey="credit"
          XAxisKey="date"
        />
      </Flex>
    </Card>
  );
};

export async function generateMetadata({ params }: Props) {
  const produit = await getProduct(params.id);

  return {
    title: produit?.name,
    description: "détails du produit " + produit?.id,
  };
}

export default ProductDetailsPage;
