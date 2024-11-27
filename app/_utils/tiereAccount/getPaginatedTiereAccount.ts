import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getPaginatedTiereAccounts(
  generalAccountId?: number,
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

  const paginatedTiereAccounts = await prisma.tiereAccount.findMany({
    where: {
      userId: user?.id,
      generalAccountId,
      name: {
        contains: searchName,
      },
    },
    orderBy: { name: order },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return paginatedTiereAccounts;
}
