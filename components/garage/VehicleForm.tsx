import React from "react";
import {
  Box, Button, Flex, Heading, useToast, Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import { supabase } from "~/lib/initSupabaseClient";
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";
import { useAuth } from "~/lib/context/AuthProvider";

type VehicleFormValues = {
  name: string;
  description: string;
};

const createVehicleSchema = yup.object().shape({
  name: yup
    .string()
    .required(),
  description: yup
    .string()
    .required(),
});

const initialValues = {
  name: "",
  description: "",
};

export const VehicleForm = () => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { user } = useAuth();

  const handleSubmit = React.useCallback(async (values: VehicleFormValues) => {
    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          name: values.name,
          description: values.description,
          created_at: new Date(),
          updated_at: new Date(),
          is_owned: true,
          type_id: 7,
          owner_id: user?.id,
        },
      ]);
    if (data) {
      toast({
        title: t("garage.vehicle.create_form.toast.title"),
        description: t("garage.vehicle.create_form.toast.success"),
        status: "success",
        ...defaultToastOptions,
      });
    }
    if (error) {
      toast({
        title: t("garage.vehicle.create_form.toast.title"),
        description: error.message || t("garage.vehicle.create_form.toast.error"),
        status: "error",
        ...defaultToastOptions,
      });
    }
  }, [t, toast, user?.id]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="6">
      <Heading>{t("garage.vehicle.create_form.title")}</Heading>
      <Text fontSize="md">{t("garage.vehicle.create_form.description")}</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createVehicleSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form id="create-vehicle">
            <Flex direction="column" gap="8px">
              <Field
                name="name"
                placeholder={t("garage.vehicle.create_form.field.name")}
              />
              <Field
                name="description"
                placeholder={t("garage.vehicle.create_form.field.description")}
              />
              <Button
                type="submit"
                form="create-vehicle"
                isLoading={isSubmitting}
                isDisabled={!isValid}
              >
                {t("garage.vehicle.create_form.cta")}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
