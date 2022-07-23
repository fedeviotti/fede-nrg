import { useState } from 'react';
import { supabase } from '../lib/SupabaseClient';
import {Box, Button, Flex, Heading, Input, Text} from "@chakra-ui/react";

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex backgroundColor="red.400">
      <Box>
        <Heading>Supabase + Next.js</Heading>
        <Text>Sign in via magic link with your email below</Text>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          onClick={(e) => {
            e.preventDefault()
            handleLogin(email)
          }}
          disabled={loading}
        >
          {loading ? 'Loading' : 'Send magic link'}
        </Button>
      </Box>
    </Flex>
  )
}
