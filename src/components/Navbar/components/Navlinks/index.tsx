import { Box, Button } from "@chakra-ui/react";

interface Props {
  navigate: (path: string) => void;
}

export const Navlinks = ({ navigate }: Props) => {
  const links = [
    {
      id: 1,
      name: "Inicio",
      path: "/home",
    },
    {
      id: 2,
      name: "Agendar Citas",
      path: "/appointments",
    },
    {
      id: 3,
      name: "Medicamentos",
      path: "/medicines",
    },
  ];
  return (
    <Box>
      {links.map((link, index) => (
        <Button
          key={link.id + index}
          variant="ghost"
          cursor={"pointer"}
          onClick={() => navigate(link.path)}
          marginRight={"10px"}
          borderRadius={"none"}
          color={"#0c313f"}
          _hover={{
            backgroundColor: "none",
            color: "#35b68f",

            borderBottom: "2px solid #35b68f",
          }}
          _focus={{
            color: "#35b68f",

            borderBottom: "2px solid #35b68f",
          }}
        >
          {link.name}
        </Button>
      ))}
    </Box>
  );
};
