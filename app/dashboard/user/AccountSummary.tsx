import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  generalAccountCount: number;
  tiereAccountCount: number;
  productCount: number;
}

const AccountSummary = ({
  generalAccountCount,
  tiereAccountCount,
  productCount,
}: Props) => {
  const containers: { label: string; value: number; href: string }[] = [
    {
      label: "Comptes généraux",
      value: generalAccountCount,
      href: "generalAccounts",
    },
    {
      label: "Comptes des tiers",
      value: tiereAccountCount,
      href: "tiereAccounts",
    },
    { label: "Produits", value: productCount, href: "products" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link className="text-sm font-medium" href={`/${container.href}`}>
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default AccountSummary;
