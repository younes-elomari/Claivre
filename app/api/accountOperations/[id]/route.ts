import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });
  if (!user) return NextResponse.json({}, { status: 401 });

  const accountOperation = await prisma.accountOperation.findUnique({
    where: { id: parseInt(params.id), userId: user.id },
  });

  if (!accountOperation)
    return NextResponse.json(
      { error: "Invalid AccountOperation." },
      { status: 404 }
    );

  const generalAccount = await prisma.generalAccount.findUnique({
    where: { id: accountOperation.generalAccountId },
  });
  if (!generalAccount)
    return NextResponse.json(
      { error: "Inavalid AccountOperation." },
      { status: 404 }
    );

  await prisma.generalAccount.update({
    where: { id: generalAccount.id },
    data: {
      debitSold:      
        generalAccount?.debitSold -
        accountOperation?.debitSold,
      creditSold:
        generalAccount?.creditSold -
        accountOperation?.creditSold,
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
          debitSold:
            tiereAccount?.debitSold -
            accountOperation?.debitSold,
          creditSold:
            tiereAccount?.creditSold -
            accountOperation?.creditSold,
        },
      });
    }
  }

  await prisma.accountOperation.delete({
    where: { id: accountOperation.id },
  });

  return NextResponse.json({});
}
