import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Flex } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "~/lib/SupabaseClient";
import Account from "~/components/Account";
import AuthLogin from "~/components/AuthLogin";

const Home: NextPage = () => {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Fede Nrg App</title>
        <meta name="description" content="Fede Nrg Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" gap="8px" width="60%" height="100%">
        <Box>
          {session ? <Account key={session?.user?.id} session={session} /> : <AuthLogin /> }
        </Box>
      </Flex>
    </>
  );
};
export default Home;
