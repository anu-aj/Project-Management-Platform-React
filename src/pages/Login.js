import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Text,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import SIST from "../imgs/SIST.png";
import Navbar from "../components/Globals/Navbar";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

// Router imports
import { Navigate } from "react-router-dom";
import StudentDashboard from "./Studentpage";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const toast = useToast();
  // useState for creds
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isauthenticated, setIsAuthenticated] = useState(null);
  // set initail user data
  const [userl, setUserl] = useState("");
  // login payload
  let userdata = {
    identifier: username,
    password: password,
  };
  const loginUser = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/auth/local", userdata)
      .then(function (response) {
        // setSetCurruser(response.data.user);
        // console.log(response.data.jwt);
        localStorage.setItem("userdata", JSON.stringify(response.data.user));
        localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
        setUserl(response.data.user);
        // console.log(response.data.user);
        // setCurruser(JSON.parse(localStorage.getItem("userdata")));
        // console.log(currUser);
        // return <Navigate to="/" replace />;
        setIsAuthenticated(true);
        // console.log(user);
      })
      .catch(function (error) {
        console.log(error);
      });

    // another role req
  };
  useEffect(() => {
    if (isauthenticated) {
      toast({
        title: "Logged in Successfully",
        status: "success",
        duration: "3000",
        isClosable: true,
        position: "top",
      });
    }
  }, [isauthenticated, toast]);

  return (
    <div>
      <Navbar />
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
          >
            <img src={SIST} alt="sistIcon"></img>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              flexDir="column"
              mb="4"
              justifyContent="center"
              alignItems="center"
            >
              <Heading color="teal.400">Login</Heading>
              <Box minW={{ base: "90%", md: "468px" }}>
                <form>
                  <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                  >
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BsFillPersonFill />}
                        />
                        {/* <label>Username</label> */}
                        <Input
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          type="text"
                          name="username"
                          id="identifier"
                          placeholder="username"
                        ></Input>
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          children={<BsFillLockFill />}
                        />
                        <Input
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                          id="password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleShowClick}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {/* <FormHelperText textAlign="right">
                        <Link>forgot password?</Link>
                      </FormHelperText> */}
                    </FormControl>
                    <Button
                      onClick={loginUser}
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      colorScheme="teal"
                      width="full"
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Stack>
            {/* <Box>
              New to us?{" "}
              <Link color="teal.500" href="#">
                Sign Up
              </Link>
            </Box> */}
          </Flex>
        </GridItem>
      </Grid>
      {/* <Box display="none"> */}
      {/* {console.log(userl)} */}
      {/* <StudentDashboard userl={userl} /> */}
      {/* </Box> */}
      {isauthenticated ? <Navigate to="/redirect" replace /> : <></>}
    </div>
  );
};

export default Login;
