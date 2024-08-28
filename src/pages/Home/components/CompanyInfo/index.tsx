import { useNavigate } from "react-router-dom";
import BirdRender from "../../../../assets/Images/BirdRender.png";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

export const CompanyInfo = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/appointments");
  };
  return (
    <Box
      display={"flex"}
      h={"100%"}
      overflow={"hidden"}
      flexDirection={"column"}
      justifyContent={"center"}
      w={{ base: "100%", md: "60%" }}
      position="relative"
      p={"5rem"}
    >
      <Image
        src={BirdRender}
        alt="Decorativa"
        position="absolute"
        top={0}
        left={"40%"}
        w={{ base: "100%", md: "50%" }}
        h="50%"
        objectFit="cover"
        zIndex={1}
        pointerEvents={"none"}
      />

      <Box zIndex={2} display={"flex"} flexDirection={"column"} gap={"1rem"}>
        <Text fontSize={"25px"} color={"#FD7E14"} fontWeight={"bold"}>
          DogCat
        </Text>
        <Heading color={"#000"} fontWeight={"bold"}>
          Donde cada patita recibe atención
        </Heading>
        <Heading color={"#000"} fontWeight={"bold"}>
          experta y cariño
        </Heading>
        <Text color={"#000"} fontSize={"20px"}>
          En nuestra clínica, cada patita recibe atención experta y cariño. Nos
          dedicamos a cuidar a tus mascotas con profesionalismo y amor,
          garantizando su salud y felicidad en cada visita.
        </Text>
        <Box>
          <Button
            borderRadius={"12px"}
            background={"#090706"}
            color={"#ffff"}
            _hover={{ background: "#FD7E14", color: "#ffff" }}
            onClick={handleNavigate}
          >
            Agendar Citas
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
