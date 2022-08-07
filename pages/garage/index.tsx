import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import NavigationBar from "~/layouts/NavigationBar";
import { Vehicles } from "@prisma/client";
import prisma from "~/lib/prisma";

type Props = {
  vehicles: Vehicles[];
};

const Garage = ({ vehicles }: Props) => (
  <>
    <Head>
      <title>Garage manager</title>
      <meta name="description" content="Garage manager application" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavigationBar shouldShowHomeButton shouldShowFeatures>
      <Box display="flex" flexDirection="column" gap="16px">
        <Box>Garage Page</Box>
        <pre>{JSON.stringify(vehicles, null, 2)}</pre>
        {vehicles?.map((vehicle) => (
          <Box key={Number(vehicle.id)}>{vehicle.name}</Box>
        ))}
      </Box>
    </NavigationBar>
  </>
);

export const getStaticProps = async () => {
  const vehicles = await prisma.vehicles.findMany();

  return {
    props: { vehicles },
  };
};

export default Garage;
