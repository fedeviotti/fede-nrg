import React from "react";
import {
  Box, Button, Flex, Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";

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

  const handleSubmit = React.useCallback((values: VehicleFormValues) => {
    console.log("values", values);
  }, []);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="6">
      <Heading>{t("garage.vehicle.form.title")}</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createVehicleSchema}
      >
        {({ isSubmitting, isValid }) => (
          <Form id="create-vehicle">
            <Flex direction="column" gap="8px">
              <Field name="name" />
              <Field name="description" />
              <Button
                form="create-vehicle"
                isLoading={isSubmitting}
                isDisabled={!isValid}
              >
                {t("garage.vehicle.form.cta")}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
