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
import { useRouter } from "next/router";
import { useAuth } from "~/lib/context/AuthProvider";
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";
import NextLink from "next/link";
import { AuthContainer } from "~/components/auth/AuthContainer";
import { useTranslation } from "next-i18next";

type SignInFormValues = {
  email: string;
  password: string;
};

const AuthSignIn = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const redirect = router.query.redirect as string;
  const { session } = useAuth();
  const toast = useToast();

  React.useEffect(() => {
    if (session) {
      router.push(redirect || "/");
    }
  }, [redirect, router, session]);

  const handleSubmit = async (submittedValues: SignInFormValues) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .auth
        .signIn({
          email: submittedValues.email,
          password: submittedValues.password,
        });
      if (error) throw new Error(error.message);
      toast({
        title: "Sign in",
        description: "Sign in successful!",
        status: "success",
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
    password: yup
      .string()
      .min(8)
      .required(),
  });

  return (
    <AuthContainer>
      <Heading>{t("auth.sign_in")}</Heading>
      <Heading as="h5" size="sm">Welcome back</Heading>
      <Heading as="h5" size="sm" fontWeight="normal">Enter your credentials</Heading>

      <Box alignSelf="stretch">
        <Formik
          initialValues={{ email: "", password: "" }}
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
                      <PasswordInput
                        {...field}
                        value={field.value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>

                  )}
                </Field>
                <Button
                  disabled={!(isValid && dirty)}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  {loading ? "Loading" : "Sign in"}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>

      <NextLink href="/signInMagicLink" passHref>
        <Link fontSize="xs" href="/signInMagicLink">
          Sign in with magic Link
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

export default AuthSignIn;
