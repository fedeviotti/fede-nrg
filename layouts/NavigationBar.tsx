import React from "react";
import {Button, ButtonGroup, Flex, Heading} from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  showHomeButton?: boolean,
  children: React.ReactNode
}

const NavigationBar = ({showHomeButton, children}: Props) => {
  return (
    <Flex direction="column" alignItems="center" width="100%" height="100vh">
      <Flex backgroundColor="green.100" width="100%" px="24px" py="16px" justifyContent="space-between">
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
        </ButtonGroup>
      </Flex>
      <Flex backgroundColor="green.300" width="60%" height="100%">
        {children}
      </Flex>
    </Flex>
  )
}

export default NavigationBar;
