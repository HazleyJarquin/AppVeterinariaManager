import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

const Mainlayout = () => {
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      // backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`}
      background={"white"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          // background: "red",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Navbar />
      </div>
      <Box
        w={"100%"}
        h={"90vh"}
        overflow={"auto"}
        // padding={"20px 20px 0px 20px"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Mainlayout;
