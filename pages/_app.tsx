import '../styles/globals.css'
import '@fontsource/poppins/100.css'
import '@fontsource/poppins/200.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'
import '@fontsource/poppins/100-italic.css'
import '@fontsource/poppins/200-italic.css'
import '@fontsource/poppins/300-italic.css'
import '@fontsource/poppins/400-italic.css'
import '@fontsource/poppins/500-italic.css'
import '@fontsource/poppins/600-italic.css'
import '@fontsource/poppins/700-italic.css'
import '@fontsource/poppins/800-italic.css'
import '@fontsource/poppins/900-italic.css'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from "../themes/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
