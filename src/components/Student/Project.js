import React from "react";
import { useState, useEffect } from "react";
import * as qs from "qs";
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
// import ProjectEdit from "./ProjectEdit";
// import DeadlineFixer from "./DeadlineFixer";
// import DeleteProject from "./DeleteProject";
import EditProjectStudent from "./EditProjectStudent";
import Completionsetter from "./Completionsetter";

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
            <Text fontWeight="medium">
              {/* Deadline : */}
              {eachproject.Deadline ? (
                <Box>
                  Deadline: {eachproject.Deadline} <br />
                </Box>
              ) : (
                <Box mt="3">
                  <Text>
                    No Deadline set, Please ask your faculty to set a deadline
                  </Text>
                </Box>
              )}
            </Text>
          </Stack>
          <Stack align="center">
            {eachproject.Completion_status ? (
              <>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  p="1"
                  bgColor="blue.300"
                  rounded="lg"
                  my={2}
                >
                  {eachproject.Completion_status}
                </Text>
              </>
            ) : (
              <>No Completion Status Found</>
            )}
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
              Users Involved
            </Button>
            <Spacer />
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
          <Box display="flex" flexDirection="column" flexWrap="wrap" gap="2">
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap="2">
              {/* <Button size="sm">Update project details</Button> */}
              <EditProjectStudent
                users_involved={users_involved}
                eachproject={eachproject}
              />
              {/* <Completionsetter eachproject={eachproject} /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Project;
