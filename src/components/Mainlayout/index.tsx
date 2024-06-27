import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import bg from "../../assets/Images/MainWallpaper.png";

const Mainlayout = () => {
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      backgroundImage={`url(${bg})`}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      <Navbar />
      <Box
        w={"100%"}
        h={"90vh"}
        overflow={"auto"}
        padding={"20px 20px 0px 20px"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Mainlayout;
