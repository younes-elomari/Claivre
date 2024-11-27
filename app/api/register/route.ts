import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { registerUserSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = registerUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: body.username }, { email: body.email }],
    },
  });
  if (user)
    return NextResponse.json(
      {
        error:
          "User already exists. try to register with deferent email or username.",
      },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json(
    {
      username: newUser.username,
      email: newUser.email,
    },
    { status: 201 }
  );
}

