import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Navlinks } from "./components/Navlinks";
import { useAuthToken } from "../../store/useAuthToken.store";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const Navbar = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthToken();

  return (
    <Box
      width={"100%"}
      height={{ base: "auto", md: "10vh" }}
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      pr={4}
      pt={10}
    >
      <Box
        backgroundColor={"#35b68f"}
        w={"20%"}
        borderTopRightRadius={"20px"}
        borderBottomRightRadius={"20px"}
        onClick={() => navigate("/home")}
        color={"#feede5"}
        cursor={"pointer"}
        display={"flex"}
        p={1}
        justifyContent={"center"}
      >
        <Heading>DogCat</Heading>
      </Box>

      <Box>
        <Navlinks navigate={navigate} />
      </Box>

      <Box display={{ base: "none", md: "flex" }} gap={3}>
        <Button
          variant={"outline"}
          leftIcon={<ArrowBackIcon />}
          borderColor={"#0c313f"}
          color={"#0c313f"}
          onClick={() => {
            setToken("");
            navigate("/login");
          }}
          _hover={{
            backgroundColor: "none",
            color: "white",
            borderColor: "white",
          }}
        >
          Exit
        </Button>
      </Box>
    </Box>
  );
};
