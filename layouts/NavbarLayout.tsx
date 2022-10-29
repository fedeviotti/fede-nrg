import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "~/components/navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

export const NavbarLayout = ({ children }: Props) => (
  <>
    <Navbar />
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
