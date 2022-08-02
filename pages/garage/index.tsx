import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import NavigationBar from "../../layouts/NavigationBar";

const Garage = () => (
  <>
    <Head>
      <title>Garage manager</title>
      <meta name="description" content="Garage manager application" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavigationBar shouldShowHomeButton shouldShowFeatures>
      <Box>Garage Page</Box>
    </NavigationBar>
  </>
);

export default Garage;
