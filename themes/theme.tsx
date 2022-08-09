import { ComponentStyleConfig, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  brand: {
    100: "#D13BC6",
    500: "#8926B2",
    900: "#D13BC6",
  },
};

const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Poppins', sans serif",

};

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "normal",
  },
};

const Form: ComponentStyleConfig = {
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles,
          },
        },
        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
          ...activeLabelStyles,
        },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: "absolute",
          backgroundColor: "white",
          pointerEvents: "none",
          mx: 3,
          px: 1,
          my: 2,
          transformOrigin: "left top",
        },
      },
    },
  },
};

const components = {
  Button,
  Form,
};

const styles = {
  global: (props: any) => ({
    "#email-label": {
      backgroundColor: mode("white", "gray.800")(props),
    },
  }),
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors, fonts, components, styles, config,
});

export default theme;
