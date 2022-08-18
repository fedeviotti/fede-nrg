import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { VehicleList } from "~/components/garage/VehicleList";
import { GetServerSideProps } from "next";
import { supabase } from "~/lib/initSupabaseClient";

const Garage = () => (
  <>
    <Head>
      <title>Garage Manager</title>
      <meta name="description" content="Garage Manager" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
      <Heading as="h2" size="xl" fontWeight="semibold">Garage Manager</Heading>
      <VehicleList />
    </Box>
  </>
);

export default Garage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login?redirect=/garage" } };
  }

  return { props: { user } };
};
