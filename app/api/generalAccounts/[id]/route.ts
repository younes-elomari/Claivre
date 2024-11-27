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

  const generalAccount = await prisma.generalAccount.findUnique({
    where: { id: parseInt(params.id), userId: user.id },
  });
  if (!generalAccount)
    return NextResponse.json(
      { error: "Invalid GeneralAccount." },
      { status: 404 }
    );

  await prisma.tiereAccount.deleteMany({
    where: { generalAccountId: generalAccount.id },
  });

  await prisma.accountOperation.deleteMany({
    where: { generalAccountId: generalAccount.id },
  });

  await prisma.generalAccount.delete({
    where: { id: generalAccount.id },
  });

  return NextResponse.json({});
}
