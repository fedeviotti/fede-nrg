import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthSignIn from "~/components/auth/AuthSignIn";
import Head from "next/head";

const SignIn = () => (
  <>
    <Head>
      <title>Sign in</title>
      <meta name="description" content="Sign in" />
      <link rel="icon" href="/public/favicon.ico" />
    </Head>
    <Flex direction="column" gap="8px" width="30%" height="100%">
      <AuthSignIn />
    </Flex>
  </>
);

export default SignIn;
