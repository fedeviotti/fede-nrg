import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import useSWR from "swr";
import NavigationBar from "../../layouts/NavigationBar";
import { supabase } from "../../lib/SupabaseClient";
import { definitions } from "../../types/supabase";

const fetcher = async () => supabase
  .from<definitions["vehicles"]>("vehicles")
  .select("*");

const Garage = () => {
  const { data, error } = useSWR("/api/vehicles", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {data.data?.map((vehicle) => (
            <Box key={vehicle.id}>{vehicle.name}</Box>
          ))}
        </Box>
      </NavigationBar>
    </>
  );
};

export default Garage;
