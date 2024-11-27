import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getTiereAccountCount(
  generalAccountId?: number,
  searchName?: string
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return 0;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return 0;

  const tiereAccountCount = await prisma.tiereAccount.count({
    where: {
      userId: user?.id,
      generalAccountId,
      name: {
        contains: searchName,
      },
    },
  });

  return tiereAccountCount;
}
