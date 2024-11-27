import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getPaginatedProducts(
  page = 1,
  pageSize = 1,
  searchName?: string,
  order?: "asc" | "desc"
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return [];

  const products = await prisma.product.findMany({
    where: {
      userId: user?.id,
      name: {
        contains: searchName,
      },
    },
    orderBy: { name: order },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return products;
}
