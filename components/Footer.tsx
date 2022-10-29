import React from "react";
import { Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <Flex minH={16} justifyContent="center" alignItems="center">
      {t("footer")}
    </Flex>
  );
};
