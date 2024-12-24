import { accountOperationSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export const  POST = async (request: NextRequest) => {
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
      debitSold: body.debitSold,
      creditSold: body.creditSold,
      lebelle: body.lebelle,
    },
  });

  await prisma.generalAccount.update({
    where: { id: newAccountOperation.generalAccountId },
    data: {
      debitSold:
        generalAccount.debitSold+
        newAccountOperation.debitSold,
      creditSold:
        generalAccount.creditSold +
        newAccountOperation.creditSold,
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
            tiereAccount.debitSold +
            newAccountOperation.debitSold,
          creditSold:
            tiereAccount.creditSold +
            newAccountOperation.creditSold,
        },
      });
  }

  return NextResponse.json(newAccountOperation, { status: 201 });
}
