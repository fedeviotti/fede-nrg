import React from "react";
import {
  Button, ButtonGroup, Flex, Image, useColorMode, useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import MEMORY_LOGO_LIGHT from "~/assets/MEMORY_LOGO_LIGHT.png";
import MEMORY_LOGO_DARK from "~/assets/MEMORY_LOGO_DARK.png";

type Props = {
  children: React.ReactNode;
};

const MemoryNavbar = ({ children }: Props) => {
  const { colorMode } = useColorMode();
  const logoSrc = useColorModeValue(MEMORY_LOGO_LIGHT.src, MEMORY_LOGO_DARK.src);

  return (
    <Flex direction="column" alignItems="center" width="100vw" height="100vh">
      <Flex
        width="100%"
        px="24px"
        py="16px"
        justifyContent="space-between"
        boxShadow={colorMode === "light" ? "rgba(0, 0, 0, .05) 0px 1px 2px" : "rgba(255, 255, 255, .1) 0px 1px 2px"}
      >
        <Image
          alt="Memory Logo"
          height={10}
          objectFit="cover"
          src={logoSrc}
        />
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
