import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/SupabaseClient';
import { Session } from "@supabase/supabase-js";
import {Button, ButtonGroup, Flex, Input} from "@chakra-ui/react";

type Props = {
  session: Session | null;
}

export default function Account({ session }: Props) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }: {
    username: string | null,
    website: string | null,
    avatar_url: string | null,
  }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex direction="column" gap="8px">
      <Input
        id="email"
        type="text"
        placeholder='Email'
        value={session?.user?.email}
        disabled
      />
      <Input
        id="username"
        type="text"
        placeholder='Username'
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        id="website"
        type="website"
        placeholder='Website'
        value={website || ''}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <Flex justifyContent="center">
        <ButtonGroup>
          <Button
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </Button>

          <Button onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}
