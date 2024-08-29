import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Tooltip, useColorMode } from "@chakra-ui/react";

export const DarkModeButtons = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeButtonLabelMapping = {
    light: "Oscuro",
    dark: "Claro",
  };

  const colorModeButtonLabel = colorModeButtonLabelMapping[colorMode];

  const iconModeColor = {
    light: <MoonIcon />,
    dark: <SunIcon />,
  };

  const iconMode = iconModeColor[colorMode];

  return (
    <Tooltip label={colorModeButtonLabel} placement="bottom">
      <Button onClick={toggleColorMode}>{iconMode}</Button>
    </Tooltip>
  );
};
