import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Tooltip, useColorMode } from "@chakra-ui/react";

export const DarkModeButtons = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeButtonLabelMapping = {
    light: "Dark mode",
    dark: "Light mode",
  };

  const colorModeButtonLabel = colorModeButtonLabelMapping[colorMode];

  const iconModeColor = {
    light: <MoonIcon color={colorMode === "dark" ? "white" : "#1a202c"} />,
    dark: <SunIcon color={colorMode === "dark" ? "white" : "#1a202c"} />,
  };

  const iconMode = iconModeColor[colorMode];

  return (
    <Tooltip label={colorModeButtonLabel} placement="bottom">
      <Button
        _hover={{
          bg: colorMode === "light" ? "gray.200" : "gray.700",
        }}
        background={colorMode === "light" ? "white" : "#1a202c"}
        onClick={toggleColorMode}
      >
        {iconMode}
      </Button>
    </Tooltip>
  );
};
