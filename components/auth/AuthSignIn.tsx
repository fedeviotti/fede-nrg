import React, { ChangeEvent } from "react";
import {
  Field, FieldInputProps, FieldMetaProps, Form, Formik,
} from "formik";
import * as yup from "yup";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "~/lib/initSupabaseClient";
import { PasswordInput } from "~/components/PasswordInput";
import { useRouter } from "next/router";
import { useAuth } from "~/lib/context/AuthProvider";
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";

type SignInFormValues = {
  email: string;
  password: string;
};

const AuthSignIn = () => {
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
      .required(),
  });

  return (
    <Flex direction="column" gap="16px">
      <Heading>Sign in</Heading>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={signInSchema}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Flex direction="column" gap="8px">
              <Field name="email">
                {({ field, meta }: { field: FieldInputProps<any>; meta: FieldMetaProps<any> }) => (
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
                {({ field, meta }: { field: FieldInputProps<any>; meta: FieldMetaProps<any> }) => (
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
                alignSelf="flex-start"
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
    </Flex>
  );
};

export default AuthSignIn;
