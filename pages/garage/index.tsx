import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import NavigationBar from "~/layouts/NavigationBar";
import { Vehicles as Vehicle } from "@prisma/client";
// import { prisma } from "~/lib/prisma";
// import { resultSerializer } from "~/lib/resultSerializer";
import useSWR, { Fetcher, Key } from "swr";
import { supabase } from "~/lib/SupabaseClient";

// type Props = {
//   vehicles: Vehicle[];
// };

const fetcher: Fetcher<Vehicle[], string> = (url: string) => fetch(url).then((res) => res.json());

const Garage = () => {
  const user = supabase.auth.user();
  const ownerId: Key = user?.id || "";
  const { data: vehicles, error } = useSWR(`/api/vehicles/${ownerId}`, fetcher);

  if (error) return <Box>An error occured.</Box>;
  if (!vehicles) return <Box>Loading ...</Box>;

  return (
    <>
      <Head>
        <title>Garage manager</title>
        <meta name="description" content="Garage manager application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar shouldShowHomeButton shouldShowFeatures>
        <Box display="flex" flexDirection="column" gap="16px">
          <Box>Garage Page</Box>
          {/* <pre>{JSON.stringify(vehicles, null, 2)}</pre> */}
          {vehicles?.map((vehicle) => (
            <Box key={Number(vehicle.id)}>{vehicle.name}</Box>
          ))}
        </Box>
      </NavigationBar>
    </>
  );
};

// export const getStaticProps = async () => {
//   const vehicles = await prisma.vehicles.findMany();
//
//   return {
//     props: { vehicles: resultSerializer(vehicles) },
//   };
// };

export default Garage;
