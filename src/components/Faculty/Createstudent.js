import React from "react";
import {
  useDisclosure,
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Textarea,
  DrawerFooter,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const Createstudent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setsucess] = useState(false);
  const [studentUsername, setStudentUsername] = useState("");
  const [StudentEmail, setStudentEmail] = useState("");
  const [StudentPassword, setStudentPassword] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  const toast = useToast();
  const studentpayload = {
    username: studentUsername,
    email: StudentEmail,
    confirmed: true,
    blocked: false,
    password: StudentPassword,
    role: 3,
    user_role: 2,
  };
  // console.log(studentpayload);

  const createStudent = async () => {
    await axios
      .post(`http://localhost:1337/api/users`, studentpayload, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then((res) => {
        // console.log(res);
        toast({
          title: "Student created.",
          description: `We've created account for ${studentUsername}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setsucess(true);
        onClose();
      })
      .catch((err) => {
        // console.log(err);
        toast({
          title: "Student Not created.",
          description: `Error: ${err}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  const btnRef = React.useRef();
  return (
    <>
      <Button
        ref={btnRef}
        w="full"
        colorScheme="green"
        size="md"
        onClick={onOpen}
      >
        Add a new student to the portal
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        size="lg"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a new student to the portal</DrawerHeader>

          <DrawerBody>
            <Box>
              <FormLabel htmlFor="username">Full name of the student</FormLabel>
              {/* <Text fontSize="sm" bgColor="red.200" p="1" rounded="sm">
                Note: Full name of the student
              </Text> */}
              <Input
                id="username"
                // value={eachproject.project_name}
                onChange={(e) => {
                  setStudentUsername(e.target.value);
                }}
                placeholder="Enter full name of the student"
              />
            </Box>
            <Box my="10">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                placeholder="enter student's email address"
                onChange={(e) => {
                  setStudentEmail(e.target.value);
                }}
                id="email"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="password">Password for Student</FormLabel>
              <Input
                placeholder="enter a password for student"
                onChange={(e) => {
                  setStudentPassword(e.target.value);
                }}
                id="email"
              />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={createStudent} colorScheme="green">
              Add this student to the portal
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Createstudent;
