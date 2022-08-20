import "../styles/globals.css";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/poppins/100-italic.css";
import "@fontsource/poppins/200-italic.css";
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/400-italic.css";
import "@fontsource/poppins/500-italic.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/700-italic.css";
import "@fontsource/poppins/800-italic.css";
import "@fontsource/poppins/900-italic.css";

import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/themes/theme";
import { NavbarLayout } from "~/layouts/NavbarLayout";
import { NextPage } from "next";
import { AuthProvider } from "~/lib/context/AuthProvider";
import { supabase } from "~/lib/initSupabaseClient";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <NavbarLayout>{page}</NavbarLayout>);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider supabase={supabase}>
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
