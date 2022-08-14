import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";
import Account from "~/components/Account";
import AuthLogin from "~/components/AuthLogin";
import { useAuth } from "~/lib/AuthProvider";

const Home: NextPage = () => {
  const { user, session, signOut } = useAuth();

  return (
    <>
      <Head>
        <title>Fede Nrg App</title>
        <meta name="description" content="Fede Nrg Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" gap="8px" width="60%" height="100%">
        <Box>
          {user ? <Account key={user?.id} session={session} signOut={signOut} /> : <AuthLogin /> }
        </Box>
      </Flex>
    </>
  );
};
export default Home;
