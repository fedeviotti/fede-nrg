import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AuthSignup from "~/components/AuthSignup";
import Head from "next/head";

const Login = () => (
  <>
    <Head>
      <title>Sign up</title>
      <meta name="description" content="Sign up Fede Nrg Application" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Flex direction="column" gap="8px" width="30%" height="100%">
      <Box>
        <AuthSignup />
      </Box>
    </Flex>
  </>
);

export default Login;
