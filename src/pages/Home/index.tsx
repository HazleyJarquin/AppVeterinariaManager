import { Box, Heading, Highlight, Image, Text } from "@chakra-ui/react";
import veterinarioVector from "../../assets/Images/VeterinarioVector.png";

export const Home = () => {
  return (
    <Box
      w={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box
        w={"40%"}
        height={"500px"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        textAlign={"center"}
        gap={5}
      >
        <Heading fontSize={"xxx-large"} color={"#33a6b7"} fontWeight={"bold"}>
          <Highlight query="DogCat" styles={{ color: "#35b68d" }}>
            Bienvenido a DogCat
          </Highlight>
        </Heading>
        <Text color={"#013147"} fontSize={"18px"} fontWeight={"bold"}>
          En DogCat, entendemos que tus mascotas son parte de tu familia y nos
          esforzamos por brindarles una atención compasiva y de alta calidad en
          un ambiente acogedor y seguro. ¡Confía en DogCat para mantener a tus
          mascotas felices y saludables!
        </Text>
      </Box>
      <Box w={"40%"} height={"500px"}>
        <Image
          w={"100%"}
          h={"100%"}
          src={veterinarioVector}
          transition={"transform 0.3s ease-in-out"}
          _hover={{ transform: "translateY(-10px)" }}
        />
      </Box>
    </Box>
  );
};
