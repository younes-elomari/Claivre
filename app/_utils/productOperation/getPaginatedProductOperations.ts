import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getPaginatedProductOperations(
  productId: number,
  order?: "asc" | "desc",
  startDate?: Date,
  endDate?: Date,
  page = 1,
  pageSize = 1
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return [];

  const paginatedProductOperations = await prisma.productOperation.findMany({
    where: {
      userId: user.id,
      productId: productId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { date: order },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return paginatedProductOperations;
}
