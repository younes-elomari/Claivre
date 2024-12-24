import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { changePasswordSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({}, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: (await params).id },
  });
  if (!user) return NextResponse.json({}, { status: 404 });

  const body = await request.json();
  const validation = changePasswordSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (body.email === user.email)
    return NextResponse.json(
      { error: "You have to change the email." },
      { status: 400 }
    );

  const matchPassword = await bcrypt.compare(
    body.password,
    user.hashedPassword
  );

  if (!matchPassword)
    return NextResponse.json(
      { error: "Password not correct." },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({
    username: updatedUser.username,
    email: updatedUser.email,
  });
}
