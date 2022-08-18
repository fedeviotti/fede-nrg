import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { NextPageWithLayout } from "~/pages/_app";
import { MemoryLayout } from "~/layouts/MemoryLayout";
import { GetServerSideProps } from "next";
import { supabase } from "~/lib/initSupabaseClient";

const Memory: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Memory game</title>
      <meta name="description" content="Memory Game" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
      <Heading as="h2" size="xl" fontWeight="semibold">Memory Game</Heading>
      The Game
    </Box>
  </>
);

Memory.getLayout = function getLayout(memory: React.ReactElement) {
  return (
    <MemoryLayout>
      {memory}
    </MemoryLayout>
  );
};

export default Memory;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login?redirect=/memory" } };
  }

  return { props: { user } };
};
