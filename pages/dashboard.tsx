import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";
import Account from "~/components/Account";
import { useAuth } from "~/lib/context/AuthProvider";
import enforceAuthenticated from "~/lib/enforceAuthenticated";

const Home: NextPage = () => {
  const { user, signOut } = useAuth();

  return user
    ? (
      <>
        <Head>
          <title>Fede Nrg App</title>
          <meta name="description" content="Fede Nrg Application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Flex direction="column" gap="8px" width="60%" height="100%">
          <Box>
            <Account key={user?.id} user={user} signOut={signOut} />
          </Box>
        </Flex>
      </>
    )
    : null;
};

export default Home;

export const getServerSideProps = enforceAuthenticated("/dashboard");
