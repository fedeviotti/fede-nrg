import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AuthLogin from "~/components/AuthLogin";
import Head from "next/head";

const Login = () => (
  <>
    <Head>
      <title>Sign in</title>
      <meta name="description" content="Sign in Fede Nrg Application" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Flex direction="column" gap="8px" width="30%" height="100%">
      <Box>
        <AuthLogin />
      </Box>
    </Flex>
  </>
);

export default Login;
