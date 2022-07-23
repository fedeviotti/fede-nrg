import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {Box, Flex} from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import NavigationBar from "../layouts/NavigationBar";
import { supabase } from '../lib/SupabaseClient';
import Auth from '../components/Auth'
import Account from '../components/Account'

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar>
        <Flex direction="column" gap="8px" width="60%" height="100%" pt="32px">
          <Box>
            {!session ? <Auth /> : <Account key={session?.user?.id} session={session} />}
          </Box>
          <Box>Contenuto</Box>
        </Flex>
      </NavigationBar>
    </>
  )
}

export default Home;
