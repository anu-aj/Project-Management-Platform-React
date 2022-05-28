import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  useColorMode,
  Badge,
  Text,
  Stack,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

function Project({ eachproject }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [users_involved, setUsersInvolved] = useState([]);
  const curJWT = JSON.parse(localStorage.getItem("jwt"));

  //   projectdetails function
  const getUsersInvolved = async () => {
    await axios
      .get(`http://localhost:1337/api/projects/${eachproject.id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data.attributes.users_involved.data);
        setUsersInvolved(response.data.data.attributes.users_involved.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //   Hook to call project details API
  useEffect(() => {
    getUsersInvolved();
  }, []);

  const finalRef = React.useRef();

  return (
    <div className="app">
      <Box
        w="300px"
        rounded="20px"
        overflow="hidden"
        bg={colorMode === "dark" ? "gray.700" : "gray.200"}
        mt={10}
      >
        <Box p={5}>
          <Stack align="center">
            <Badge variant="solid" colorScheme="green" rounded="full" px={2}>
              {eachproject.project_name}
            </Badge>
          </Stack>
          <Stack align="center">
            <Text as="h2" fontWeight="normal" my={2}>
              {eachproject.project_description}
            </Text>
            <Text fontWeight="light">GitHub Link : {eachproject.gh_link}</Text>
          </Stack>
          <Flex>
            <Spacer />
            <Button
              variant="solid"
              colorScheme="green"
              size="sm"
              onClick={onOpen}
            >
              Learn More
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Text fontSize="2xl">Users Involved in project</Text>
                  <Text fontSize="2xl" color="blue.800">
                    {eachproject.project_name}
                  </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {users_involved.map((eachuser) => {
                    return (
                      <Text fontWeight="light" mb="3">
                        {eachuser.id}. {eachuser.attributes.username}{" "}
                        {eachuser.attributes.email.includes("@sist.com") ? (
                          <>
                            <Badge bgColor="blue.300" ml="3">
                              Role: Faculty
                            </Badge>
                          </>
                        ) : (
                          <Badge bgColor="yellow.300" ml="3">
                            Role: Student
                          </Badge>
                        )}
                      </Text>
                    );
                  })}
                  <Text fontWeight="light">
                    {/* {users_involved.map((eachuser) => {
                      return <h1 key={eachuser.id}>{eachuser.username}</h1>;
                    })} */}
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  {/* <Button variant="ghost">Secondary Action</Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Box>
      </Box>
    </div>
  );
}

export default Project;
