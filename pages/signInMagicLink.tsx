import React from "react";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import AuthMagicLink from "~/components/auth/AuthMagicLink";

const SignInMagicLink = () => (
  <>
    <Head>
      <title>Sign in with Magic Link</title>
      <meta name="description" content="Sign in with Magic Link" />
      <link rel="icon" href="/public/favicon.ico" />
    </Head>
    <Flex direction="column" gap="8px" width="30%" height="100%">
      <AuthMagicLink />
    </Flex>
  </>
);

export default SignInMagicLink;
