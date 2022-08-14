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
  Text,
} from "@chakra-ui/react";
import { supabase } from "~/lib/initSupabaseClient";
import { PasswordInput } from "~/components/PasswordInput";
import { useRouter } from "next/router";

type LoginFormValues = {
  email: string;
  password: string;
};

const AuthLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (submittedValues: LoginFormValues) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .auth
        .signIn({
          email: submittedValues.email,
          password: submittedValues.password,
        });
      if (error) throw new Error(error.message);
      alert("Check your email for the login link!");
      router.push("/");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginSchema = yup.object().shape({
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
      <Heading>Supabase + Next.js</Heading>
      <Text>Log in with email and password</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
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
                {loading ? "Loading" : "Login"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default AuthLogin;
