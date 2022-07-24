import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans serif`
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, fonts });

export default theme
