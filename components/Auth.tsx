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
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { supabase } from "~/lib/SupabaseClient";

type AuthFormValues = {
  email: string;
};

const Auth = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (submittedValues: AuthFormValues) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email: submittedValues.email });
      if (error) throw new Error(error.message);
      alert("Check your email for the login link!");
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
  });

  return (
    <Flex direction="column" gap="16px">
      <Heading>Supabase + Next.js</Heading>
      <Text>Sign in via magic link with your email below</Text>

      <Formik
        initialValues={{ email: "" }}
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
                    variant="floating"
                    isInvalid={meta.touched && !!meta.error}
                  >
                    {/* <pre>{JSON.stringify(meta, null, 2)}</pre> */}
                    <Input
                      {...field}
                      placeholder=" "
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                    <FormLabel>Email</FormLabel>
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

export default Auth;
