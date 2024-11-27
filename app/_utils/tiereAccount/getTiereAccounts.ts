import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getTiereAccounts(generalAccountId?: number) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return [];

  const tiereAccounts = await prisma.tiereAccount.findMany({
    where: { userId: user?.id, generalAccountId: generalAccountId },
    orderBy: { name: "asc" },
  });

  return tiereAccounts;
}
