import { useState } from 'react';
import { supabase } from '../lib/SupabaseClient';
import {Field, FieldInputProps, FieldMetaProps, Form, Formik} from "formik";
import * as yup from "yup";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";

type AuthFormValues = {
  email: string;
}

export default function Auth() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (submittedValues: AuthFormValues) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email: submittedValues.email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
  });

  return (
    <Flex direction="column" gap="8px">
      <Heading>Supabase + Next.js</Heading>
      <Text>Sign in via magic link with your email below</Text>

      <Formik
        initialValues={{email: ""}}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({isSubmitting, isValid, dirty} ) => (
        <Form>
          <Flex direction="column" gap="8px">
            <Field name='email'>
              {({ field, meta }: {field: FieldInputProps<any>, meta: FieldMetaProps<any>}) => (
                <FormControl
                  id="email"
                  variant="floating"
                  isInvalid={meta.touched && !!meta.error}
                >
                  {/*<pre>{JSON.stringify(meta, null, 2)}</pre>*/}
                  <Input
                    {...field}
                    placeholder=" "
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                  <FormLabel>Email</FormLabel>
                  {/*<FormHelperText>Keep it very short and sweet!</FormHelperText>*/}
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              alignSelf="flex-start"
              disabled={!(isValid && dirty)}
              isLoading={isSubmitting}
              type='submit'
            >
              {loading ? 'Loading' : 'Send magic link'}
            </Button>
          </Flex>
        </Form>)}
      </Formik>
    </Flex>
  )
}
