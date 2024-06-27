import { WarningIcon as WarningChakraIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

interface Props {
  message: string;
}
export const WarningIcon = ({ message }: Props) => {
  return (
    <>
      <Tooltip label={message}>
        <WarningChakraIcon color={"red.500"} />
      </Tooltip>
    </>
  );
};
