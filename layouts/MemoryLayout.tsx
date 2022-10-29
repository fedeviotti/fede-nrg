import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import MemoryNavbar from "~/components/navbar/MemoryNavbar";

type Props = {
  children: React.ReactNode;
};

export const MemoryLayout = ({ children }: Props) => (
  <>
    <MemoryNavbar />
    <Flex
      direction="column"
      alignItems="center"
      px="24px"
      py="16px"
      height="90%"
    >
      {children}
    </Flex>
    <Box>Footer</Box>
  </>
);
