import { User } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  user: User;
}

const UserDetails = ({ user }: Props) => {
  return (
    <Card>
      <Flex direction="column" gap="4" p="2">
        <Text className="text-gray-800 font-medium">
          Nom d'utilisateur: <span className="text-gray-600">{user.username}</span>
        </Text>
        <Text className="text-gray-800 font-medium">
          Email: <span className="text-gray-600">{user.email}</span>
        </Text>
      </Flex>
    </Card>
  );
};

export default UserDetails;
