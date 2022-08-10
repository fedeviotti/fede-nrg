import React from "react";
import {
  Button, ButtonGroup, Flex, Text, useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
};

const MemoryNavbar = ({ children }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Flex direction="column" alignItems="center" width="100vw" height="100vh">
      <Flex
        width="100%"
        px="24px"
        py="16px"
        justifyContent="space-between"
        boxShadow={colorMode === "light" ? "rgba(0, 0, 0, .05) 0px 1px 2px" : "rgba(255, 255, 255, .1) 0px 1px 2px"}
      >
        {/* <Image
          alt="FedeNrg Logo"
          rounded="lg"
          height={10}
          objectFit="cover"
          src={logoSrc}
        /> */}
        <Text>Memory Logo</Text>
        <ButtonGroup>
          <NextLink href="/" passHref>
            <Button as="a">Back</Button>
          </NextLink>
        </ButtonGroup>
      </Flex>
      {children}
    </Flex>
  );
};

export default MemoryNavbar;
