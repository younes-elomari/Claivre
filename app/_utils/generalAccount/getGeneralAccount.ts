import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getGeneralAccount(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return null;

  const generalAccount = await prisma.generalAccount.findUnique({
    where: {
      userId: user?.id,
      id: parseInt(id),
    },
  });

  return generalAccount;
}
