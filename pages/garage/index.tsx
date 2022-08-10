import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { VehicleList } from "~/components/garage/VehicleList";
import { NavbarLayout } from "~/layouts/NavbarLayout";

const Garage = () => (
  <>
    <Head>
      <title>Garage Manager</title>
      <meta name="description" content="Garage Manager" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavbarLayout>
      <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
        <Heading as="h2" size="xl" fontWeight="semibold">Garage Manager</Heading>
        <VehicleList />
      </Box>
    </NavbarLayout>
  </>
);

export default Garage;
