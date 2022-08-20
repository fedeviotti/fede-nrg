import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AuthSignIn from "~/components/auth/AuthSignIn";
import Head from "next/head";

const SignIn = () => (
  <>
    <Head>
      <title>Sign in</title>
      <meta name="description" content="Sign in Fede Nrg Application" />
      <link rel="icon" href="/public/favicon.ico" />
    </Head>
    <Flex direction="column" gap="8px" width="30%" height="100%">
      <Box>
        <AuthSignIn />
      </Box>
    </Flex>
  </>
);

export default SignIn;
