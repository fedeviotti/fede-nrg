import React from "react";
import useSWR, { Fetcher, Key } from "swr";
import { supabase } from "~/lib/initSupabaseClient";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const fetcher:
Fetcher<any, string> = (url: string) => fetch(url).then((res) => res.json());

const Orders = () => {
  const user = supabase.auth.user();
  const ownerId: Key = user?.id || "";
  const { data: orders, error } = useSWR(`/api/cryptocurrency/orders/${ownerId}`, fetcher);

  if (error) return <Box>An error occurred.</Box>;
  if (!orders) return <Box>Loading ...</Box>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={12}>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
      {orders?.map((order: any) => (
        <GridItem key={order.id}>{order.id}</GridItem>
      ))}
    </Grid>
  );
};

export default Orders;
