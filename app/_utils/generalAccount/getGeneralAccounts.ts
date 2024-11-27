import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getGeneralAccounts() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return [];

  const generalAccounts = await prisma.generalAccount.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: { name: "asc" },
  });

  return generalAccounts;
}
