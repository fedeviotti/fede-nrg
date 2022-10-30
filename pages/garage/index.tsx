import React from "react";
import {
  Box, Button, Heading, useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { VehicleList } from "~/components/garage/VehicleList";
import { VehicleForm } from "~/components/garage/VehicleForm";
import enforceAuthenticated from "~/lib/enforceAuthenticated";
import { useTranslation } from "react-i18next";

const Garage = () => {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Head>
        <title>{t("garage.title")}</title>
        <meta name="description" content={t("garage.title")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
        <Heading as="h2" size="xl" fontWeight="semibold">{t("garage.title")}</Heading>
        <Button onClick={onOpen}>{t("garage.cta")}</Button>
        <VehicleList />
      </Box>
      <VehicleForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Garage;

export const getServerSideProps = enforceAuthenticated("/garage");
