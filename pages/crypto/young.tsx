import React from "react";
import useSWR, { Fetcher } from "swr";
import {
  Box, Grid, GridItem,
} from "@chakra-ui/react";
import { Order } from "~/types/crypto/Order";

const weightedAverage = (prices: number[], weights: number[]) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] += prices[i] * w;
      acc[1] += w;
      return acc;
    },
    [0, 0],
  );
  return sum / weightSum;
};

const ordersWeightedAverage = (orders: Order[] = []) => {
  const prices: number[] = [];
  const weights: number[] = [];
  orders.forEach((order) => {
    prices.push(Number(order.rate));
    weights.push(Number(order.volume));
  });
  return weightedAverage(prices, weights);
};

const fetcher:
Fetcher<Order[], string> = (url: string) => fetch(url).then((res) => res.json());

const Young = () => {
  const { data: orders, error } = useSWR("/api/crypto/orders/young", fetcher);

  if (error) {
    return (
      <Box>
        {`An error occurred. ${error}`}
      </Box>
    );
  }
  if (!orders) return <Box>Loading ...</Box>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={12}>
      {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
      <div>
        Average price:
        {ordersWeightedAverage(orders)}
      </div>
      {orders?.map((order) => (
        <GridItem key={order.orderID}>
          <div>{order.orderID}</div>
          <div>{order.baseCurrency}</div>
          <div>{order.quoteCurrency}</div>
          <div>{order.side}</div>
          <div>{order.volume}</div>
          <div>{order.rate}</div>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Young;
