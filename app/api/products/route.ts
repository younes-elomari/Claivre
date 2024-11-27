import { productSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return NextResponse.json({}, { status: 401 });

  const products = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = productSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newProduct = await prisma.product.create({
    data: {
      userId: user.id,
      name: body.name,
      unit: body.unit,
      stock: parseFloat(body.stock),
      purchasePrice: parseFloat(body.purchasePrice),
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}