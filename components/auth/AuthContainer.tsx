import React from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const AuthContainer = ({ children }: Props) => (
  <Flex direction="column" gap="16px" alignItems="center">
    {children}
  </Flex>
);
