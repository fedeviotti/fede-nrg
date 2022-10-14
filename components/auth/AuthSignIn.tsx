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
import { useTranslation } from "react-i18next";
import { supabase } from "~/lib/initSupabaseClient";
import { PasswordInput } from "~/components/PasswordInput";
import { useRouter } from "next/router";
import { useAuth } from "~/lib/context/AuthProvider";
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";
import NextLink from "next/link";
import { AuthContainer } from "~/components/auth/AuthContainer";

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
      router.push(redirect || "/dashboard");
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
        title: t("auth.sign_in.toast.title"),
        description: t("auth.sign_in.toast.success"),
        status: "success",
        ...defaultToastOptions,
      });
    } catch (error: any) {
      toast({
        title: t("auth.sign_in.toast.title"),
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
      <Heading>{t("auth.sign_in.title")}</Heading>
      <Heading as="h5" size="sm">{t("auth.sign_in.sub_title")}</Heading>
      <Heading as="h5" size="sm" fontWeight="normal">{t("auth.sign_in.description")}</Heading>

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
                        placeholder={t("auth.sign_in.form.email")}
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
                  {loading ? t("common.loading") : t("auth.sign_in.title")}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>

      <NextLink href="/signInMagicLink" passHref>
        <Link fontSize="xs" href="/signInMagicLink">
          {t("auth.sign_in.magic_link")}
        </Link>
      </NextLink>
      <NextLink href="/signUp" passHref>
        <Link fontSize="xs" href="/signUp">
          {t("auth.sign_in.no_account")}
        </Link>
      </NextLink>
    </AuthContainer>
  );
};

export default AuthSignIn;
