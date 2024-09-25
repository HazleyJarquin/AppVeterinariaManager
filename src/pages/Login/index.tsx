import {
  Box,
  Button,
  FormLabel,
  Heading,
  Highlight,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { useLoginForm } from "../../hooks/useLoginForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WarningIcon } from "../../components/WarningIcon";
import { useAuthToken } from "../../store/useAuthToken.store";
import { LockIcon } from "@chakra-ui/icons";
import { EyeIcon, EyeOffIcon, PawPrint, UserIcon } from "lucide-react";
import { useAttempts } from "../../store/useAttempts.store";

const MAX_ATTEMPTS = 3;

const Login = () => {
  const [show, setShow] = useState(false);
  const { attempts, setAttempts, isLocked, setIsLocked } = useAttempts();
  const { colorMode } = useColorMode();
  const [lockMessage, setLockMessage] = useState("");
  const { formik, data, isLoading } = useLoginForm();
  const { setToken } = useAuthToken();
  const navigate = useNavigate();
  const [attemptsMessage, setAttemptsMessage] = useState("");

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLocked) {
      setLockMessage("Pantalla bloqueada por 5 segundos...");
      timer = setTimeout(() => {
        setIsLocked(false);
        setAttempts(0);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isLocked]);

  useEffect(() => {
    if (data?.Token) {
      setToken(data.Token);
      navigate("/home");
      setAttempts(0);
    }
  }, [data, setToken, navigate, setAttempts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await formik.handleSubmit();

    if (!data?.Token) {
      const remainingAttempts = 2 - attempts;

      if (attempts >= 2) {
        setIsLocked(true);
        setAttemptsMessage("");
      } else {
        setAttempts(attempts + 1);
        setAttemptsMessage(
          `Usuario o password incorrectos, tienes ${remainingAttempts} intento(s) restantes.`
        );
      }
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  return (
    <Box
      w={"100%"}
      height={"100vh"}
      display={"flex"}
      backgroundColor={"#f3f4f6"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isLocked ? (
        <Box
          w={"100%"}
          height={"100vh"}
          display={"flex"}
          backgroundColor={"#f3f4f6"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            w={"25%"}
            rounded={"md"}
            border={"1px solid #ffffff"}
            color={"#000"}
            background={"#ffffff"}
            p={10}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading color={"#FD7E14"}>Usuario bloqueado</Heading>
            <Box mt={4}>{lockMessage}</Box>
          </Box>
        </Box>
      ) : (
        <Box
          w={{ base: "90%", sm: "50%", md: "50%", lg: "35%", xl: "25%" }}
          rounded={"md"}
          border={"1px solid #ffffff"}
          color={"#000"}
          background={"#ffffff"}
          p={10}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          gap={"20px"}
        >
          <Box display={"flex"} gap={"0.2rem"} alignItems={"center"}>
            <PawPrint color="#FD7E14" size={"30px"} />
            <Heading>
              <Highlight
                query="Cat"
                styles={{ color: "#ffffff", background: "#FD7E14" }}
              >
                DogCat
              </Highlight>
            </Heading>
          </Box>

          <Box>
            <Box width={"100%"} display={"flex"} gap={2}>
              <FormLabel>Usuario</FormLabel>
              {formik.errors.User && formik.touched.User ? (
                <WarningIcon message={formik.errors.User} />
              ) : null}
            </Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <UserIcon />
              </InputLeftElement>
              <Input
                variant={"flushed"}
                placeholder="usuario"
                _placeholder={{
                  color: colorMode === "light" ? "light" : "black",
                  opacity: "0.5",
                }}
                onBlur={(event) => {
                  if (event.target instanceof HTMLInputElement) {
                    formik.setFieldValue("User", event.target.value);
                  }

                  formik.handleBlur("User")(event);
                }}
                onChange={(event) => {
                  formik.setFieldValue("User", event.target.value);
                  formik.validateField("User");
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
                type={show ? "text" : "password"}
                onKeyDown={onKeyPress}
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
              <InputRightElement width="4.5rem">
                <Button
                  background={"transparent"}
                  _hover={{ background: "transparent" }}
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          {attemptsMessage && (
            <div
              style={{ color: "red", fontSize: "15px", marginBottom: "10px" }}
            >
              {attemptsMessage}
            </div>
          )}
          <Button
            background={"#FD7E14"}
            color={"white"}
            _hover={{ background: "#e1403f" }}
            onClick={handleLogin}
            isLoading={isLoading}
            isDisabled={attempts >= MAX_ATTEMPTS}
          >
            Iniciar Sesión
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Login;
