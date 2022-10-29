import React from "react";
import { Flex } from "@chakra-ui/react";
import MemoryNavbar from "~/components/navbar/MemoryNavbar";
import { Footer } from "~/components/Footer";

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
    <Footer />
  </>
);
