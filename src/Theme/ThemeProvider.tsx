import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { config } from "./config";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const theme = extendTheme({ config });

export function ThemeProvider({ children }: Props) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
}
