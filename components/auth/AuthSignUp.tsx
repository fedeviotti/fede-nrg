import React, { ChangeEvent } from "react";
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
import { PasswordInput } from "~/components/PasswordInput";
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";
import { AuthContainer } from "~/components/auth/AuthContainer";
import NextLink from "next/link";

type SignUpFormValues = {
  email: string;
  password: string;
};

const AuthSignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const handleSubmit = async (submittedValues: SignUpFormValues) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .auth
        .signUp({
          email: submittedValues.email,
          password: submittedValues.password,
        });
      if (error) throw new Error(error.message);
      toast({
        title: "Sign up",
        description: "Sign up successful!",
        status: "success",
        ...defaultToastOptions,
      });
    } catch (error: any) {
      toast({
        title: "Sign up",
        description: error.error_description || error.message,
        status: "error",
        ...defaultToastOptions,
      });
    } finally {
      setLoading(false);
    }
  };

  const signUpSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(8)
      .required(),
  });

  return (
    <AuthContainer>
      <Heading>Sign up</Heading>
      <Heading as="h5" size="sm">Sign up on FedeNrg Site</Heading>
      <Heading as="h5" size="sm" fontWeight="normal">Fill the form</Heading>

      <Box alignSelf="stretch">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
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
                <Field name="password">
                  {({ field, meta }: {
                    field: FieldInputProps<any>;
                    meta: FieldMetaProps<any>;
                  }) => (
                    <FormControl
                      id="password"
                      isInvalid={meta.touched && !!meta.error}
                    >
                      {/* <FormLabel>Password</FormLabel> */}
                      <PasswordInput
                        {...field}
                        value={field.value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
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
                  {loading ? "Loading" : "Sign up"}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>

      <NextLink href="/signIn" passHref>
        <Link fontSize="xs" href="/signIn">
          Already registered? Login
        </Link>
      </NextLink>
    </AuthContainer>
  );
};

export default AuthSignUp;
