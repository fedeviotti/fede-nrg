import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthSignIn from "~/components/auth/AuthSignIn";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default SignIn;
