import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getGeneralAccountsCount(searchName?: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return 0;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return 0;

  const generalAccountsCount = await prisma.generalAccount.count({
    where: {
      userId: user?.id,
      name: {
        contains: searchName,
      },
    },
  });

  return generalAccountsCount;
}
