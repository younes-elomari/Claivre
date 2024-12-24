import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return NextResponse.json({}, { status: 401 });

  const productOperation = await prisma.productOperation.findUnique({
    where: { id: parseInt((await params).id), userId: user.id },
  });
  if (!productOperation)
    return NextResponse.json(
      { error: "Invalid ProductOperation." },
      { status: 404 }
    );

  const product = await prisma.product.findUnique({
    where: {
      id: productOperation.productId,
    },
  });
  if (!product)
    return NextResponse.json({ error: "Invalid ProductId" }, { status: 400 });

  await prisma.product.update({
    where: { id: productOperation.productId },
    data: {
      purchasePrice:
        product.purchasePrice -
        productOperation.purchasePrice +
        productOperation.salePrice,
      stock:
        product.stock -
        productOperation.purchaseQuantity +
        productOperation.saleQuantity,
    },
  });

  await prisma.productOperation.delete({
    where: {
      id: productOperation.id,
    },
  });

  return NextResponse.json({});
};
