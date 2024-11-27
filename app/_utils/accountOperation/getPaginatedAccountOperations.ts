import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getPaginatedAccountOperations(
  generalAccountId?: number,
  tiereAccountId?: number,
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

  const accountOperations = await prisma.accountOperation.findMany({
    where: {
      userId: user?.id,
      generalAccountId: generalAccountId,
      tiereAccountId: tiereAccountId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { date: order },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return accountOperations;
}
