import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { NavbarLayout } from "~/layouts/NavbarLayout";

const Memory = () => (
  <>
    <Head>
      <title>Memory game</title>
      <meta name="description" content="Memory Game" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavbarLayout>
      <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
        <Heading as="h2" size="xl" fontWeight="semibold">Memory Game</Heading>
        The Game
      </Box>
    </NavbarLayout>
  </>
);

export default Memory;
