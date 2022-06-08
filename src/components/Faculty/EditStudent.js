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
  //   Select,
  Textarea,
  useToast,
  DrawerFooter,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Badge,
} from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";
import React from "react";
import { useState } from "react";

const EditStudent = ({ allUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studentID, setStudentID] = useState("");
  const [label, setlabel] = useState("");
  const [semail, setSEmail] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  const btnRef = React.useRef();
  const toast = useToast();

  const useroptions = [];
  allUsers.map((eachuser) => {
    if (eachuser.user_role.role_name != "faculty") {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.username;
      user.email = eachuser.email;
      useroptions.push(user);
    }
  });
  const editpayload = {
    username: username ? username : label,
    email: email ? email : semail,
  };

  //   handler
  const handlesubmit = (e) => {
    setStudentID(e.value);
    setlabel(e.label);
    setSEmail(e.email);
  };

  const editStudentDetails = async () => {
    await axios
      .put(`http://localhost:1337/api/users/${studentID}`, editpayload, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then((res) => {
        // console.log(res);
        toast({
          title: "Student Details Updated...",
          description: `Status : ${res.status}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((err) => {
        // console.log(err);
        toast({
          title: "Student Details Updation Failed...",
          description: `Status : ${err.status}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button ref={btnRef} colorScheme="green" w="full" onClick={onOpen}>
        Edit Student Detail
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
          <DrawerHeader>Edit Student Details</DrawerHeader>

          <DrawerBody>
            <label htmlFor="id">Select a student to edit</label>
            {/* {console.log(studentID)} */}
            {console.log("req payload", editpayload)}
            <Select
              onChange={handlesubmit}
              id="name"
              isMulti={false}
              options={useroptions}
            />
            <Box my="5">
              <label htmlFor="username">Enter the new username</label>
              <Input
                type="text"
                placeholder="Enter updated username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Box>
            <Box>
              <label htmlFor="email">Enter the new email address</label>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter updated email address"
              />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={editStudentDetails} colorScheme="green">
              Save Student Details
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EditStudent;
