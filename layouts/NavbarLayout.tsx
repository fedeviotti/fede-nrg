import React from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "~/components/Navbar";

type Props = {
  children: React.ReactNode;
};

export const NavbarLayout = ({ children }: Props) => (
  <Navbar shouldShowFeatures shouldShowHomeButton>
    <Flex justifyContent="center" p={8} width="full" height="full">
      {children}
    </Flex>
  </Navbar>

);
