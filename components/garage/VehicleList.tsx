import React from "react";
import { supabase } from "~/lib/initSupabaseClient";
import useSWR, { Fetcher, Key } from "swr";
import { Box, Stack } from "@chakra-ui/react";
import { VehicleCard } from "~/components/garage/VehicleCard";
import { ExtendedVehicle } from "~/types/garage/vehicle";

const fetcher:
Fetcher<ExtendedVehicle[], string> = (url: string) => fetch(url).then((res) => res.json());

export const VehicleList = () => {
  const user = supabase.auth.user();
  const ownerId: Key = user?.id || "";
  const { data: vehicles, error } = useSWR(`/api/vehicles/${ownerId}`, fetcher);

  if (error) return <Box>An error occured.</Box>;
  if (!vehicles) return <Box>Loading ...</Box>;

  return (
    <Stack direction="row">
      {/* <pre>{JSON.stringify(vehicles, null, 2)}</pre> */}
      {vehicles?.map((vehicle) => (
        <VehicleCard key={Number(vehicle.id)} vehicle={vehicle} />
      ))}
    </Stack>
  );
};
