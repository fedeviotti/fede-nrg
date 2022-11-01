import React from "react";
import {
  Button, Flex, HStack, Image, Select, useColorMode, useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import LOGO_LIGHT from "~/assets/FEDENRG_LOGO_LIGHT.png";
import LOGO_DARK from "~/assets/FEDENRG_LOGO_DARK.png";
import { useAuth } from "~/lib/context/AuthProvider";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const Navbar = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { signOut } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoSrc = useColorModeValue(LOGO_LIGHT.src, LOGO_DARK.src);

  const handleChange = React.useCallback(async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value: locale } = event.target;
    await router.push(router.asPath, router.asPath, { locale });
    await i18n.changeLanguage(locale);
  }, [i18n, router]);

  return (
    <Flex
      width="100%"
      px="24px"
      py="12px"
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
        <NextLink href="/dashboard">Dashboard</NextLink>
        <NextLink href="/garage">Garage</NextLink>
        <NextLink href="/crypto">Crypto</NextLink>
        <NextLink href="/memory">Memory</NextLink>
        <Select
          placeholder="Language"
          width="75px"
          value={router.locale}
          onChange={handleChange}
        >
          <option value="it">IT</option>
          <option value="en">EN</option>
        </Select>
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
  );
};

export default Navbar;
