import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text size="2" className="font-medium my-2" color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
