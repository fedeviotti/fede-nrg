import React from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "~/components/navbar/Navbar";
import { Footer } from "~/components/Footer";

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
    <Footer />
  </>
);
