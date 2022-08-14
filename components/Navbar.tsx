import React from "react";
import {
  Button, Flex, HStack, Image, useColorMode, useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import LOGO_LIGHT from "~/assets/FEDENRG_LOGO_LIGHT.png";
import LOGO_DARK from "~/assets/FEDENRG_LOGO_DARK.png";
import { supabase } from "~/lib/initSupabaseClient";

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
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
          height={10}
          objectFit="cover"
          src={logoSrc}
        />
        <HStack spacing={8}>
          <Link href="/">Home</Link>
          <Link href="/garage">Garage</Link>
          <Link href="/memory">Memory</Link>
          <Button onClick={toggleColorMode} variant="outline">
            Toggle
            {" "}
            {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Button onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </HStack>
      </Flex>
      {children}
    </Flex>
  );
};

export default Navbar;
