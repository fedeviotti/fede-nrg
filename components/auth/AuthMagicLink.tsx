import React from "react";
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
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";

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
    <Flex direction="column" gap="16px">
      <Heading>Sign in via magic link</Heading>

      <Formik
        initialValues={{ email: "" }}
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
              <Button
                alignSelf="flex-start"
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
    </Flex>
  );
};

export default AuthMagicLink;
