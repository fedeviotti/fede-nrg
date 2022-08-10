import React from "react";
import { Flex } from "@chakra-ui/react";
import MemoryNavbar from "~/components/MemoryNavbar";

type Props = {
  children: React.ReactNode;
};

export const MemoryLayout = ({ children }: Props) => (
  <MemoryNavbar>
    <Flex justifyContent="center" p={8} width="full" height="full">
      {children}
    </Flex>
  </MemoryNavbar>
);
