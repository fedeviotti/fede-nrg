import React from "react";
import {
  Button, Flex, HStack, Image, Text, useColorMode, useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import LOGO_LIGHT from "~/assets/FEDENRG_LOGO_LIGHT.png";
import LOGO_DARK from "~/assets/FEDENRG_LOGO_DARK.png";
import { useAuth } from "~/lib/context/AuthProvider";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  const { i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoSrc = useColorModeValue(LOGO_LIGHT.src, LOGO_DARK.src);
  const { signOut } = useAuth();
  const router = useRouter();

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
          height={10}
          objectFit="cover"
          src={logoSrc}
        />
        <HStack spacing={8}>
          <NextLink href={router.asPath} locale="en">
            <Text
              cursor="pointer"
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </Text>
          </NextLink>
          <NextLink href={router.asPath} locale="it">
            <Text
              cursor="pointer"
              onClick={() => i18n.changeLanguage("it")}
            >
              IT
            </Text>
          </NextLink>
          <NextLink href="/">Home</NextLink>
          <NextLink href="/garage">Garage</NextLink>
          <NextLink href="/memory">Memory</NextLink>
          <Button onClick={toggleColorMode} variant="outline">
            Toggle
            {" "}
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Button onClick={signOut}>
            Sign Out
          </Button>
        </HStack>
      </Flex>
      {children}
    </Flex>
  );
};

export default Navbar;
