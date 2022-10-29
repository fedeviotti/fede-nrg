import React from "react";
import {
  Button, Flex, Heading, useToast, Text, Input, Select,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  Field, Form, Formik, FormikHelpers,
} from "formik";
import { supabase } from "~/lib/initSupabaseClient";
import { defaultToastOptions } from "~/lib/constants/defaultToastOptions";
import { useAuth } from "~/lib/context/AuthProvider";
import { useSWRConfig } from "swr";

type VehicleFormValues = {
  name: string;
  description: string;
  type: string;
};

const createVehicleSchema = yup.object().shape({
  name: yup
    .string()
    .required(),
  description: yup
    .string()
    .required(),
  type: yup
    .string()
    .required(),
});

const initialValues = {
  name: "",
  description: "",
  type: "",
};

export const VehicleForm = () => {
  const { t } = useTranslation("common");
  const toast = useToast();
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  const handleSubmit = React.useCallback(async (
    values: VehicleFormValues,
    helpers: FormikHelpers<VehicleFormValues>,
  ) => {
    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          name: values.name,
          description: values.description,
          created_at: new Date(),
          updated_at: new Date(),
          is_owned: true,
          type_id: Number(values.type),
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
      await mutate(`/api/vehicles/${user?.id}`);
      helpers.resetForm();
    }
    if (error) {
      toast({
        title: t("garage.vehicle.create_form.toast.title"),
        description: error.message || t("garage.vehicle.create_form.toast.error"),
        status: "error",
        ...defaultToastOptions,
      });
    }
  }, [mutate, t, toast, user?.id]);

  return (
    <Flex
      p={6}
      gap={4}
      direction="column"
      borderWidth="1px"
      borderRadius="lg"
      w="50%"
    >
      <Heading as="h3" size="md">{t("garage.vehicle.create_form.title")}</Heading>
      <Text fontSize="md">{t("garage.vehicle.create_form.description")}</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createVehicleSchema}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form id="create-vehicle">
            <Flex direction="column" gap={4}>
              <Field
                as={Input}
                name="name"
                placeholder={t("garage.vehicle.create_form.field.name")}
              />
              <Field
                as={Input}
                name="description"
                placeholder={t("garage.vehicle.create_form.field.description")}
              />
              <Field
                as={Select}
                name="type"
                placeholder={t("garage.vehicle.create_form.field.type")}
              >
                <option value="7">Bike</option>
                <option value="8">Car</option>
              </Field>
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
    </Flex>
  );
};
