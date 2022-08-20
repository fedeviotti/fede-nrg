import { UseToastOptions } from "@chakra-ui/react";

export const defaultToastOptions: Pick<UseToastOptions, "position" | "duration" | "isClosable"> = {
  position: "top",
  duration: 5000,
  isClosable: true,
};
