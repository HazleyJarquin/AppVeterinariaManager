import { Box, Image } from "@chakra-ui/react";
import DocsRender from "../../assets/Images/DogsRender.png";
import { CompanyInfo } from "./components/CompanyInfo";

export const Home = () => {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={{ base: "column", md: "flex" }}
      justifyContent={"space-between"}
    >
      <CompanyInfo />

      <Image
        pointerEvents={"none"}
        display={{ base: "none", md: "block" }}
        w={"50%"}
        h={"100%"}
        src={DocsRender}
      />
    </Box>
  );
};
