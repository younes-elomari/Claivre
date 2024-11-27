import { accountOperationSchema } from "@/app/validationSchemas";
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
  const validation = accountOperationSchema.safeParse(body);
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

  const newAccountOperation = await prisma.accountOperation.create({
    data: {
      userId: user.id,
      generalAccountId: parseInt(body.generalAccountId),
      tiereAccountId: parseInt(body.tiereAccountId),
      date: body.date,
      debitSold: parseFloat(body.debitSold),
      creditSold: parseFloat(body.creditSold),
      lebelle: body.lebelle,
    },
  });

  await prisma.generalAccount.update({
    where: { id: newAccountOperation.generalAccountId },
    data: {
      debitSold:
        parseFloat(generalAccount.debitSold.toString()) +
        parseFloat(newAccountOperation.debitSold.toString()),
      creditSold:
        parseFloat(generalAccount.creditSold.toString()) +
        parseFloat(newAccountOperation.creditSold.toString()),
    },
  });

  if (newAccountOperation.tiereAccountId) {
    const tiereAccount = await prisma.tiereAccount.findUnique({
      where: { id: newAccountOperation.tiereAccountId },
    });
    if (tiereAccount)
      await prisma.tiereAccount.update({
        where: { id: tiereAccount.id },
        data: {
          debitSold:
            parseFloat(tiereAccount.debitSold.toString()) +
            parseFloat(newAccountOperation.debitSold.toString()),
          creditSold:
            parseFloat(tiereAccount.creditSold.toString()) +
            parseFloat(newAccountOperation.creditSold.toString()),
        },
      });
  }

  return NextResponse.json(newAccountOperation, { status: 201 });
}
