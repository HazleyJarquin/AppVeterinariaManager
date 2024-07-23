import { Box, Heading, Image, Text } from "@chakra-ui/react";

import { Carousel } from "../../components/Carousel";

export const Home = () => {
  const data = [
    {
      id: 1,
      src: "https://img.freepik.com/vector-gratis/ejemplo-dibujado-mano-linda-fondo-perro-corgi_53876-119462.jpg?t=st=1720067597~exp=1720071197~hmac=a18745728ed58970659e2ceff9ed00a1a888a8db4e3bc2e41031d9cd7e95bd4f&w=996",
    },
    {
      id: 2,
      src: "https://img.freepik.com/vector-premium/perros-diferentes-razas-retrato-grupo-perros-lindos-felices-cachorros-juntos-animales-caninos-raza-pura-bulldog-ingles-poodle-bobtail-samoyed-diversos-pedigrees-ilustracion-vectorial-plana_198278-22003.jpg?w=1380",
    },
    {
      id: 3,
      src: "https://img.freepik.com/vector-gratis/marco-doodle-animales_53876-99294.jpg?t=st=1720067670~exp=1720071270~hmac=8f6cda34a1ce240fb474922a43dc100f2d9aa3c534327f81bdef33887dab7f6f&w=996",
    },
    {
      id: 4,
      src: "https://img.freepik.com/foto-gratis/diseno-patrones-perros-estilo-arte-digital_23-2151517782.jpg?t=st=1720067743~exp=1720071343~hmac=66326d8b476b7580108a812a68572bc7484825e911b42dee287c9fbdaa2633d1&w=740",
    },
    {
      id: 5,
      src: "https://img.freepik.com/vector-gratis/lindo-patron-costuras-perros-arco-iris_1191-880.jpg?t=st=1720067796~exp=1720071396~hmac=abefe3dc810d30c9bba6a5d0172af58f9b090dfa6a2e58330e762e8ae8aa3b44&w=740",
    },
  ];
  return (
    <Box w={"100%"} mt={"60px"}>
      <Box>
        <Carousel
          height="500px"
          data={data.map((data, index: number) => (
            <Box
              key={data.id + index}
              position="relative"
              height="100%"
              width="100%"
            >
              <Image
                objectFit="cover"
                w="100%"
                height="100%"
                alt="alt"
                src={data.src}
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundColor="rgba(0, 0, 0, 0.8)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  textAlign={"center"}
                  w={"40%"}
                >
                  <Heading>Bienvenido a DogCat</Heading>
                  <Text color={"#ffffff"} fontSize={"18px"} fontWeight={"bold"}>
                    En DogCat, entendemos que tus mascotas son parte de tu
                    familia y nos esforzamos por brindarles una atención
                    compasiva y de alta calidad en un ambiente acogedor y
                    seguro. ¡Confía en DogCat para mantener a tus mascotas
                    felices y saludables!
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        />
      </Box>
    </Box>
  );
};
