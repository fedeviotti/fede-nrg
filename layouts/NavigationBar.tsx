import React from "react";
import { Button, ButtonGroup, Flex, Heading, useColorMode} from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  showHomeButton?: boolean,
  children: React.ReactNode
}

const NavigationBar = ({showHomeButton, children}: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex direction="column" alignItems="center" width="100vw" height="100vh">
      <Flex
        width="100%"
        px="24px"
        py="16px"
        justifyContent="space-between"
        boxShadow={colorMode === "light" ? "rgba(0, 0, 0, .05) 0px 1px 2px" : "rgba(255, 255, 255, .1) 0px 1px 2px"}
      >
        <Heading>Fede Nrg Site</Heading>
        <ButtonGroup>
          {showHomeButton && (
            <NextLink href='/' passHref>
              <Button as="a">Home</Button>
            </NextLink>
          )}
          <NextLink href='/garage' passHref>
            <Button as="a">Garage</Button>
          </NextLink>
          <NextLink href='#' passHref>
            <Button as="a">Memory</Button>
          </NextLink>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex width="100%" justifyContent="center" pt="32px">{children}</Flex>
    </Flex>
  )
}

export default NavigationBar;
