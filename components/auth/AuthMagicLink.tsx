import React from "react";
import {
  Field, FieldInputProps, FieldMetaProps, Form, Formik,
} from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input, Link,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "~/lib/initSupabaseClient";
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";
import { AuthContainer } from "~/components/auth/AuthContainer";
import NextLink from "next/link";

type AuthFormValues = {
  email: string;
};

const AuthMagicLink = () => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const handleSubmit = async (submittedValues: AuthFormValues) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email: submittedValues.email });
      if (error) throw new Error(error.message);
      toast({
        title: "Sign in",
        description: "Check your email for the login link!",
        status: "info",
        ...defaultToastOptions,
      });
    } catch (error: any) {
      toast({
        title: "Sign in",
        description: error.error_description || error.message,
        status: "error",
        ...defaultToastOptions,
      });
    } finally {
      setLoading(false);
    }
  };

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
  });

  return (
    <AuthContainer>
      <Heading>Sign in with magic link</Heading>
      <Heading as="h5" size="sm">Welcome back</Heading>
      <Heading as="h5" size="sm" fontWeight="normal">Enter you email</Heading>

      <Box alignSelf="stretch">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form>
              <Flex direction="column" gap="8px">
                <Field name="email">
                  {({ field, meta }: {
                    field: FieldInputProps<any>;
                    meta: FieldMetaProps<any>;
                  }) => (
                    <FormControl
                      id="email"
                      isInvalid={meta.touched && !!meta.error}
                    >
                      {/* <FormLabel>Email</FormLabel> */}
                      <Input
                        {...field}
                        placeholder="Email"
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                      {/* <FormHelperText>Keep it very short and sweet!</FormHelperText> */}
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  disabled={!(isValid && dirty)}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  {loading ? "Loading" : "Send magic link"}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>

      <NextLink href="/signIn" passHref>
        <Link fontSize="xs" href="/signIn" mt="80px">
          Sign in with password
        </Link>
      </NextLink>
      <NextLink href="/signUp" passHref>
        <Link fontSize="xs" href="/signUp">
          Don&apos;t have an account? Sign up
        </Link>
      </NextLink>
    </AuthContainer>
  );
};

export default AuthMagicLink;
