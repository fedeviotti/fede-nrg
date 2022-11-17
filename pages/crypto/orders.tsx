/* eslint-disable react/no-children-prop */
import React from "react";
import useSWR, { Fetcher, Key } from "swr";
import { supabase } from "~/lib/initSupabaseClient";
import {
  Box, Input, InputGroup, InputLeftElement, Stack, Text,
} from "@chakra-ui/react";
import { YoungOrders as YoungOrder } from "@prisma/client";

const fetcher:
Fetcher<YoungOrder[], string> = (url: string) => fetch(url).then((res) => res.json());

const getOrderType = (side: string | null) => {
  switch (side) {
    case "BUY":
      return "bought";
    case "SELL":
      return "sold";
    case "SWAP":
      return "swapped";
    default:
      return "unknown";
  }
};

const getSymbol = (base: string | null) => {
  switch (base) {
    case "EUR":
      return "€";
    case "BTC":
      return "₿";
    case "ETH":
      return "Ξ";
    case "USDT":
      return "$";
    case "YNG":
      return "Y";
    case "ALGO":
      return "A";
    case "DOT":
      return "D";
    default:
      return "unknown";
  }
};

const Orders = () => {
  const user = supabase.auth.user();
  const ownerId: Key = user?.id || "";
  const { data: orders, error } = useSWR(`/api/crypto/orders/${ownerId}`, fetcher);

  if (error) return <Box>An error occurred.</Box>;
  if (!orders) return <Box>Loading ...</Box>;

  return (
    <Stack direction="column" spacing={4}>
      {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
      {orders?.map((order) => (
        <Box key={order.id}>
          <Text>{`I ${getOrderType(order.side)} ${order.base} with ${order.quote}`}</Text>
          <Stack direction="row">
            {order.amount && (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={getSymbol(order.quote)}
                />
                <Input placeholder="Amount" defaultValue={order.amount} />
              </InputGroup>
            )}
            {order.volume && (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={getSymbol(order.base)}
                />
                <Input placeholder="Volume" defaultValue={order.volume} />
              </InputGroup>
            )}
          </Stack>
          {order.date && <Input defaultValue={new Date(order.date).toISOString()} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Orders;
