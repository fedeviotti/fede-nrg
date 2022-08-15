import React from "react";
import {
  Button, Input, InputGroup, InputRightElement,
} from "@chakra-ui/react";
import { FieldInputProps } from "formik";

export const PasswordInput = ({ ...props }: FieldInputProps<any>) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        {...props}
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
