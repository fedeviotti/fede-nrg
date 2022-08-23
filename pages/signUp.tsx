import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthSignUp from "~/components/auth/AuthSignUp";
import Head from "next/head";

const Login = () => (
  <>
    <Head>
      <title>Sign up</title>
      <meta name="description" content="Sign up" />
      <link rel="icon" href="/public/favicon.ico" />
    </Head>
    <Flex direction="column" gap="8px" width="30%" height="100%">
      <AuthSignUp />
    </Flex>
  </>
);

export default Login;
