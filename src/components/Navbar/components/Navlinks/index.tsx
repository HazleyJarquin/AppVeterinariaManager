import { Box, Button } from "@chakra-ui/react";
import { useAuthToken } from "../../../../store/useAuthToken.store";

interface Props {
  navigate: (path: string) => void;
}

export const Navlinks = ({ navigate }: Props) => {
  const { tokenDecoded } = useAuthToken();
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
      restricted: "Veterinario",
    },
    {
      id: 3,
      name: "Clientes",
      path: "/clients",
      restricted: "Administrador",
    },
    {
      id: 4,
      name: "Usuarios",
      path: "/users",
      restricted: "Administrador",
    },
  ];

  const filteredLinks = links.filter((link) => {
    if (link.restricted) {
      return tokenDecoded?.role === link.restricted;
    }
    return true;
  });
  return (
    <Box>
      {filteredLinks.map((link, index) => (
        <Button
          key={link.id + index}
          variant="ghost"
          cursor={"pointer"}
          onClick={() => navigate(link.path)}
          marginRight={"10px"}
          borderRadius={"none"}
          color={"#000"}
          _hover={{
            backgroundColor: "none",
            color: "#FD7E14",

            borderBottom: "2px solid #FD7E14",
          }}
          _focus={{
            color: "#FD7E14",

            borderBottom: "2px solid #FD7E14",
          }}
        >
          {link.name}
        </Button>
      ))}
    </Box>
  );
};
