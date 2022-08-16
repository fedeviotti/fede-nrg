import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";
import Account from "~/components/Account";
import { supabase } from "~/lib/initSupabaseClient";
import { useAuth } from "~/lib/AuthProvider";

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  return { props: { user } };
};
