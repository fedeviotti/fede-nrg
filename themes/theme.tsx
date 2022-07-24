import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans serif`,

};

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};

const components = {
  Form: {
    variants: {
      floating: {
        container: {
          _focusWithin: {
            label: {
              ...activeLabelStyles
            }
          },
          "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
            ...activeLabelStyles
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
            transformOrigin: "left top"
          }
        }
      }
    }
  }
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, fonts, components });

export default theme
