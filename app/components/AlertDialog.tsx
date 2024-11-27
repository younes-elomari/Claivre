import { Card, Heading, Text } from "@radix-ui/themes";
import React from "react";

const AlertDialog = () => {
  return (
    <Card>
      <Heading size="4" weight="medium" className="text-red-500">
        Vous n'avez pas de compte sur notre site?
      </Heading>
      <Text size="2" weight="medium" className="text-red-500">
        Créez votre compte dés maintenant et commencez à suivre vos fonds, vos
        dépenses et vos actifs.
      </Text>
    </Card>
  );
};

export default AlertDialog;
