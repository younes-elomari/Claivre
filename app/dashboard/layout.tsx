import { Card, Flex, Heading } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import DashboardActions from "./DashboardActions";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <Card className="mb-2">
      <Flex direction="column" gap="4">
        <Flex justify="between">
          <Heading size="5">Tableau de Bord.</Heading>
          <DashboardActions />
        </Flex>
        {children}
      </Flex>
    </Card>
  );
};

export default DashboardLayout;
