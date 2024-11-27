import { tiereAccountSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return NextResponse.json({}, { status: 401 });

  const tiereAccount = await prisma.tiereAccount.findMany({
    where: { userId: user.id },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(tiereAccount);
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
  const validation = tiereAccountSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const generalAccount = await prisma.generalAccount.findUnique({
    where: { id: parseInt(body.generalAccountId) },
  });
  if (!generalAccount)
    return NextResponse.json(
      { error: "Invalid GeneralAccount." },
      { status: 400 }
    );

  if (body.email) {
    const tiereAccount = await prisma.tiereAccount.findUnique({
      where: { email: body.email },
    });
    if (tiereAccount)
      return NextResponse.json(
        { error: "Invalid Tiere Account" },
        { status: 400 }
      );
  }

  const newTiereAccount = await prisma.tiereAccount.create({
    data: {
      userId: user.id,
      generalAccountId: parseInt(body.generalAccountId),
      name: body.name,
      debitSold: parseFloat(body.debitSold),
      creditSold: parseFloat(body.creditSold),
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });

  await prisma.generalAccount.update({
    where: { id: generalAccount.id },
    data: {
      debitSold:
        parseFloat(generalAccount.debitSold.toString()) +
        parseFloat(newTiereAccount.debitSold.toString()),
      creditSold:
        parseFloat(generalAccount.creditSold.toString()) +
        parseFloat(newTiereAccount.creditSold.toString()),
    },
  });

  return NextResponse.json(newTiereAccount, { status: 201 });
}
