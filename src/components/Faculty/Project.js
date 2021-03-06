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
import ProjectEdit from "./ProjectEdit";
import DeadlineFixer from "./DeadlineFixer";
import DeleteProject from "./DeleteProject";
import * as qs from "qs";

function Project({ eachproject }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [users_involved, setUsersInvolved] = useState([]);
  const curJWT = JSON.parse(localStorage.getItem("jwt"));

  //   projectdetails function
  const getUsersInvolved = async () => {
    const query = qs.stringify(
      {
        populate: {
          users_involved: {
            populate: ["user_role"],
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    await axios
      .get(`http://localhost:1337/api/projects/${eachproject.id}?${query}`, {
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
          <Stack align="center">
            <Text
              bg="blue.300"
              p="1"
              rounded="lg"
              as="h2"
              fontWeight="normal"
              my={2}
            >
              {eachproject.Completion_status}
            </Text>
          </Stack>
          <Stack align="center">
            <Text fontWeight="medium">
              {/* Deadline : */}
              {eachproject.Deadline ? (
                <Box>
                  Deadline: {eachproject.Deadline} <br />
                  <DeadlineFixer eachproject={eachproject} />
                </Box>
              ) : (
                <Box mt="3">
                  <Text>No Deadline set, Please set a deadline</Text>
                  <DeadlineFixer eachproject={eachproject} />
                </Box>
              )}
            </Text>
          </Stack>
          <Flex>
            <Spacer />
            <Button
              variant="solid"
              m="5"
              colorScheme="green"
              size="sm"
              onClick={onOpen}
            >
              Students Involved
            </Button>
            <Spacer />
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Text fontSize="2xl">Students Involved in project</Text>
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
                  {/* <Text fontWeight="light"></Text> */}
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  {/* <Button variant="ghost">Secondary Action</Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* CRUD for projects */}
          </Flex>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap="2">
            <Box>
              {/* <Button size="sm">Update project details</Button> */}
              <ProjectEdit
                users_involved={users_involved}
                eachproject={eachproject}
              />
            </Box>
            <Box>
              {/* <Button onClick={deleteProject} size="sm">
                Delete Project
              </Button> */}
              <DeleteProject eachproject={eachproject} />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Project;
