import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AuthSignUp from "~/components/auth/AuthSignUp";
import Head from "next/head";

const Login = () => (
  <>
    <Head>
      <title>Sign up</title>
      <meta name="description" content="Sign up Fede Nrg Application" />
      <link rel="icon" href="/public/favicon.ico" />
    </Head>
    <Flex direction="column" gap="8px" width="30%" height="100%">
      <Box>
        <AuthSignUp />
      </Box>
    </Flex>
  </>
);

export default Login;
