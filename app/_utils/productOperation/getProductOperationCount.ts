import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function getProductOperationCount(
  productId: number,
  startDate?: Date,
  endDate?: Date
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return 0;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return 0;

  const productCount = await prisma.productOperation.count({
    where: {
      userId: user.id,
      productId: productId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return productCount;
}
