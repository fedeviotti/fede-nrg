import React from "react";
import useSWR from "swr";
import axios from "axios";
import { Box, Grid } from "@chakra-ui/react";
import enforceAuthenticated from "~/lib/enforceAuthenticated";
import { CryptoCard } from "~/components/crypto/CryptoCard";
import { CryptoCurrencyListingsResponse } from "~/types/crypto/CryptoCurrencyListingsReponse";

const fetcher = (url: string) => axios.get<undefined, CryptoCurrencyListingsResponse>(url)
  .then((response) => response.data);

const Crypto = () => {
  const { data, error } = useSWR(
    "/api/cryptocurrency/listings",
    fetcher,
  );

  if (!data) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Something went wrong.</Box>;
  }

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={12}>
      {data.map((crypto: any) => <CryptoCard key={crypto.id} crypto={crypto} />)}
    </Grid>
  );
};

export default Crypto;

export const getServerSideProps = enforceAuthenticated("/crypto");
