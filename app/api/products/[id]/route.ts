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

  const product = await prisma.product.findUnique({
    where: { id: parseInt((await params).id), userId: user.id },
  });
  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 404 });

  await prisma.productOperation.deleteMany({
    where: { productId: product.id },
  });

  await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({});
};
