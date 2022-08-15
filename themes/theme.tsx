import { ComponentStyleConfig, extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  brand: {
    100: "#D13BC6",
    500: "#8926B2",
    900: "#25228C",
  },
};

const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Poppins', sans serif",

};

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "normal",
  },
};

const components = {
  Button,
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors, fonts, components, config,
});

export default theme;
