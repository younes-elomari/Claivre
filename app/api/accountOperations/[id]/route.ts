import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return NextResponse.json({}, { status: 401 });

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const accountOperation = await prisma.accountOperation.findUnique({
    where: { id: parsedId, userId: user.id },
  });

  if (!accountOperation)
    return NextResponse.json(
      { error: "Invalid Account Operation." },
      { status: 404 }
    );

  const generalAccount = await prisma.generalAccount.findUnique({
    where: { id: accountOperation.generalAccountId },
  });

  if (!generalAccount)
    return NextResponse.json(
      { error: "Invalid General Account." },
      { status: 404 }
    );

  // Safely parse debitSold and creditSold
  const debitSold = parseFloat(generalAccount.debitSold?.toString() || '0');
  const creditSold = parseFloat(generalAccount.creditSold?.toString() || '0');
  const debitSoldOperation = parseFloat(accountOperation.debitSold?.toString() || '0');
  const creditSoldOperation = parseFloat(accountOperation.creditSold?.toString() || '0');

  await prisma.generalAccount.update({
    where: { id: generalAccount.id },
    data: {
      debitSold: debitSold - debitSoldOperation,
      creditSold: creditSold - creditSoldOperation,
    },
  });

  if (accountOperation.tiereAccountId) {
    const tiereAccount = await prisma.tiereAccount.findUnique({
      where: { id: accountOperation.tiereAccountId },
    });
    if (tiereAccount) {
      await prisma.tiereAccount.update({
        where: { id: tiereAccount.id },
        data: {
          debitSold: parseFloat(tiereAccount.debitSold?.toString() || '0') - debitSoldOperation,
          creditSold: parseFloat(tiereAccount.creditSold?.toString() || '0') - creditSoldOperation,
        },
      });
    }
  }

  await prisma.accountOperation.delete({
    where: { id: accountOperation.id },
  });

  return NextResponse.json({});
}
