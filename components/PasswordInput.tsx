import React from "react";
import {
  Button, Input, InputGroup, InputRightElement,
} from "@chakra-ui/react";
import { FieldInputProps } from "formik";
import { useTranslation } from "react-i18next";

export const PasswordInput = ({ ...props }: FieldInputProps<any>) => {
  const { t } = useTranslation("common");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        {...props}
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={t("common.field.password")}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? t("common.hide") : t("common.show")}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
