import { productOperationSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = productOperationSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const product = await prisma.product.findUnique({
    where: { id: parseInt(body.productId) },
  });
  if (!product)
    return NextResponse.json({ error: "Invalid Product" }, { status: 400 });

  const newProductOperation = await prisma.productOperation.create({
    data: {
      userId: user.id,
      productId: parseInt(body.productId),
      date: body.date,
      unitPrice: body.unitPrice,
      purchaseQuantity: body.purchaseQuantity,
      purchasePrice: body.purchasePrice,
      saleQuantity: body.saleQuantity,
      salePrice: body.salePrice,
    },
  });

  await prisma.product.update({
    where: { id: product.id },
    data: {
      purchasePrice:        
        product.purchasePrice +        
        newProductOperation.purchasePrice -        
        newProductOperation.salePrice,
      stock:        
        product.stock +        
        newProductOperation.purchaseQuantity -        
        newProductOperation.saleQuantity,
    },
  });

  return NextResponse.json(newProductOperation, { status: 201 });
}
