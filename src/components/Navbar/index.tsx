import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Navlinks } from "./components/Navlinks";
import { useAuthToken } from "../../store/useAuthToken.store";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { PawPrint } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthToken();

  return (
    <Box
      width={"80%"}
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={"1rem"}
      boxSizing={"border-box"}
      boxShadow={"md"}
      backgroundColor={"#ffff"}
      borderRadius={"20px"}
    >
      <Box display={"flex"} gap={"0.2rem"} alignItems={"center"}>
        <PawPrint color="#FD7E14" size={"30px"} />
        <Heading pointerEvents={"none"}>DogCat</Heading>
      </Box>

      <Box>
        <Navlinks navigate={navigate} />
      </Box>

      <Box display={{ base: "none", md: "flex" }} gap={3}>
        <Button
          variant={"outline"}
          leftIcon={<ArrowBackIcon />}
          borderColor={"#000"}
          color={"#000"}
          onClick={() => {
            setToken("");
            navigate("/login");
          }}
          _hover={{
            backgroundColor: "none",
            borderColor: "#FD7E14",
            color: "#FD7E14",
          }}
        >
          Salir
        </Button>
      </Box>
    </Box>
  );
};
