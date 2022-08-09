import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import NavigationBar from "~/layouts/NavigationBar";
import { VehicleList } from "~/components/garage/VehicleList";

const Garage = () => (
  <>
    <Head>
      <title>Garage manager</title>
      <meta name="description" content="Garage manager application" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavigationBar shouldShowHomeButton shouldShowFeatures>
      <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
        <Heading as="h2" size="xl" fontWeight="semibold">Garage Page</Heading>
        <VehicleList />
      </Box>
    </NavigationBar>
  </>
);

export default Garage;
