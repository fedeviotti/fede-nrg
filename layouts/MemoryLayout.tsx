import React from "react";
import { Flex } from "@chakra-ui/react";
import MemoryNavbar from "~/components/navbar/MemoryNavbar";
import { Footer } from "~/components/Footer";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "~/layouts/constants";

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
      minHeight={`calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
    >
      {children}
    </Flex>
    <Footer />
  </>
);
