import {
  Box,
  Button,
  FormLabel,
  Heading,
  Highlight,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useLoginForm } from "../../hooks/useLoginForm";
import bgMain from "../../assets/Images/MainWallpaper.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WarningIcon } from "../../components/WarningIcon";
import { useAuthToken } from "../../store/useAuthToken.store";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

const Login = () => {
  const { colorMode } = useColorMode();
  const { formik, data, isError, isLoading, isSuccess, error } = useLoginForm();
  const { setToken } = useAuthToken();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isSuccess && data?.Token) {
      setToken(data?.Token);
      navigate("/home");
    } else if (isError) {
      const errorMessage =
        error?.response?.data?.Message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, data, isError, error, setToken, navigate, toast]);

  return (
    <Box
      w={"100%"}
      height={"100vh"}
      display={"flex"}
      backgroundImage={`url(${bgMain})`}
      backgroundSize={"cover"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        w={"30%"}
        rounded={"md"}
        border={"1px solid #ffffff"}
        backdropFilter={"blur(10px)"}
        color={"#34b68d"}
        p={10}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={"20px"}
      >
        <Heading>
          <Highlight
            query="Cat"
            styles={{ color: "#ffffff", background: "#34b68d" }}
          >
            DogCat
          </Highlight>
        </Heading>

        <Box>
          <Box width={"100%"} display={"flex"} gap={2}>
            <FormLabel>Correo</FormLabel>
            {formik.errors.Correo && formik.touched.Correo ? (
              <WarningIcon message={formik.errors.Correo} />
            ) : null}
          </Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon />
            </InputLeftElement>
            <Input
              variant={"flushed"}
              placeholder="test@test.com"
              _placeholder={{
                color: colorMode === "light" ? "light" : "black",
                opacity: "0.5",
              }}
              onBlur={(event) => {
                if (event.target instanceof HTMLInputElement) {
                  formik.setFieldValue("Correo", event.target.value);
                }

                formik.handleBlur("Correo")(event);
              }}
              onChange={(event) => {
                formik.setFieldValue("Correo", event.target.value);
                formik.validateField("Correo");
              }}
            />
          </InputGroup>
        </Box>

        <Box>
          <Box width={"100%"} display={"flex"} gap={2}>
            <FormLabel>Password</FormLabel>
            {formik.errors.Password && formik.touched.Password ? (
              <WarningIcon message={formik.errors.Password} />
            ) : null}
          </Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon />
            </InputLeftElement>
            <Input
              _placeholder={{
                color: colorMode === "light" ? "light" : "black",
                opacity: "0.5",
              }}
              placeholder="******"
              variant={"flushed"}
              type="password"
              onBlur={(event) => {
                if (event.target instanceof HTMLInputElement) {
                  formik.setFieldValue("Password", event.target.value);
                }

                formik.handleBlur("Password")(event);
              }}
              onChange={(event) => {
                formik.setFieldValue("Password", event.target.value);
                formik.validateField("Password");
              }}
            />
          </InputGroup>
        </Box>

        <Button
          background={"#35b68f"}
          color={"white"}
          _hover={{ background: "#e1403f" }}
          onClick={() => formik.handleSubmit()}
          isLoading={isLoading}
        >
          Iniciar Sesion
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
