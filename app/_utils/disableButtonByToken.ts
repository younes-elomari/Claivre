import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function disableButtonByToken() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return true;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return true;

  return false;
}
