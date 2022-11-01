import React from "react";
import { Grid } from "@chakra-ui/react";
import enforceAuthenticated from "~/lib/enforceAuthenticated";
import axios, { AxiosResponse } from "axios";
import { CryptoCurrency } from "~/types/crypto/cryptoCurrency";
import { CryptoCard } from "~/components/crypto/CryptoCard";

type Props = {
  data: CryptoCurrency[];
};

const Crypto = ({ data }: Props) => (
  <Grid templateColumns="repeat(4, 1fr)" gap={12}>
    {data.map((crypto: any) => <CryptoCard key={crypto.id} crypto={crypto} />)}
  </Grid>
);

export default Crypto;

export const getServerSideProps = enforceAuthenticated("/crypto", async () => {
  try {
    const response = await axios.get<any, AxiosResponse<CryptoCurrency[]>>("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=8", {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.X_CMC_PRO_API_KEY || "",
      },
    });
    return {
      props: response.data,
    };
  } catch (e: any) {
    throw new Error(e.message || "An error occurred");
  }
});
