import React from "react";
import {
  Button, ButtonGroup, Flex, Image, useColorMode, useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import LOGO_LIGHT from "~/assets/FEDENRG_LOGO_LIGHT.png";
import LOGO_DARK from "~/assets/FEDENRG_LOGO_DARK.png";

type Props = {
  shouldShowHomeButton?: boolean;
  shouldShowFeatures?: boolean;
  children: React.ReactNode;
};

const Navbar = ({ shouldShowHomeButton, shouldShowFeatures, children }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const logoSrc = useColorModeValue(LOGO_LIGHT.src, LOGO_DARK.src);

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
          alt="FedeNrg Logo"
          rounded="lg"
          height={10}
          objectFit="cover"
          src={logoSrc}
        />
        <ButtonGroup>
          {shouldShowHomeButton && (
            <NextLink href="/" passHref>
              <Button as="a">Home</Button>
            </NextLink>
          )}
          {shouldShowFeatures && (
            <>
              <NextLink href="/garage" passHref>
                <Button as="a">Garage</Button>
              </NextLink>
              <NextLink href="/memory" passHref>
                <Button as="a">Memory</Button>
              </NextLink>
            </>
          )}
          <Button onClick={toggleColorMode} variant="outline">
            Toggle
            {" "}
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </ButtonGroup>
      </Flex>
      {children}
    </Flex>
  );
};

export default Navbar;
