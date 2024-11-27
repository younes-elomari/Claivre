import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getProductOperations(
  productId: number,
  order?: "asc" | "desc"
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return [];

  const productOperations = await prisma.productOperation.findMany({
    where: { userId: user?.id, productId: productId },
    orderBy: { date: order },
  });

  return productOperations;
}
