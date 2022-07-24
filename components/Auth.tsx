import { useState } from 'react';
import { supabase } from '../lib/SupabaseClient';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";

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
    <Flex direction="column" gap="8px">
      <Heading>Supabase + Next.js</Heading>
      <Text>Sign in via magic link with your email below</Text>

      <FormControl
        id="email"
        variant="floating"
        isRequired
        isInvalid
      >
        <Input
          type="email"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* It is important that the Label comes after the Control due to css selectors */}
        <FormLabel>Email</FormLabel>
        <FormHelperText>Keep it very short and sweet!</FormHelperText>
        <FormErrorMessage>Your First name is invalid</FormErrorMessage>
      </FormControl>
      <Button
        onClick={(e) => {
          e.preventDefault()
          handleLogin(email)
        }}
        disabled={loading}
      >
        {loading ? 'Loading' : 'Send magic link'}
      </Button>
    </Flex>
  )
}
