import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import AccountSummary from "./AccountSummary";
import { getGeneralAccountsCount } from "@/app/_utils/generalAccount/getGenerallAccountsCount";
import { getTiereAccountCount } from "@/app/_utils/tiereAccount/getTiereAccountCount";
import { getProductsCount } from "@/app/_utils/product/getProductsCount";
import UserDetails from "./UserDetails";
import ChangePasswordForm from "./ChangePasswordForm";
import { Metadata } from "next";

const DashboardUserPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });

  if (!user)
    return (
      <Button variant="outline">
        <Link href="/api/auth/signout">Se déconnecter</Link>
      </Button>
    );

  const generalAccountCount = await getGeneralAccountsCount();
  const tiereAccountCount = await getTiereAccountCount();
  const productCount = await getProductsCount();

  return (
    <div>
      <Flex direction="column" gap="4">
        <Flex justify="between" align="center">
          <Text size="3" className="font-medium text-gray-600">
            Bienvenue: {user.username}
          </Text>
          <Button variant="outline">
            <Link href="/api/auth/signout">Se déconnecter</Link>
          </Button>
        </Flex>
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
          <Flex direction="column" gap="5">
            <AccountSummary
              generalAccountCount={generalAccountCount}
              tiereAccountCount={tiereAccountCount}
              productCount={productCount}
            />
            <UserDetails user={user} />
          </Flex>
          <ChangePasswordForm userId={user.id} />
        </Grid>
      </Flex>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Claivre - Utilisateur",
  description:
    "**Page Utilisateur** : Prenez le contrôle total de votre compte et personnalisez-le selon vos besoins. Sur cette page, vous pouvez modifier votre adresse email de connexion et votre mot de passe en toute simplicité.",
};

export default DashboardUserPage;
