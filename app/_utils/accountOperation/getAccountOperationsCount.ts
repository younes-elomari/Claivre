import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getAccountOperationsCount(
  generalAccountId?: number,
  tiereAccountId?: number,
  startDate?: Date,
  endDate?: Date
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return 0;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return 0;

  const accountOperationsCount = await prisma.accountOperation.count({
    where: {
      userId: user?.id,
      generalAccountId: generalAccountId,
      tiereAccountId: tiereAccountId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return accountOperationsCount;
}
