import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

  const tiereAccount = await prisma.tiereAccount.findUnique({
    where: { id: parseInt(params.id), userId: user.id },
  });
  if (!tiereAccount)
    return NextResponse.json(
      { error: "Invalid TiereAccount." },
      { status: 404 }
    );

  const generalAccount = await prisma.generalAccount.findUnique({
    where: {
      id: tiereAccount.generalAccountId,
    },
  });
  if (!generalAccount)
    return NextResponse.json(
      { error: "Invalid TiereAccount" },
      { status: 404 }
    );

  await prisma.generalAccount.update({
    where: { id: tiereAccount.generalAccountId },
    data: {
      debitSold:
        parseFloat(generalAccount.debitSold.toString()) -
        parseFloat(tiereAccount.debitSold.toString()),
      creditSold:
        parseFloat(generalAccount.creditSold.toString()) -
        parseFloat(tiereAccount.creditSold.toString()),
    },
  });

  await prisma.accountOperation.deleteMany({
    where: { tiereAccountId: tiereAccount.id },
  });

  await prisma.tiereAccount.delete({
    where: { id: tiereAccount.id },
  });

  return NextResponse.json({});
}
