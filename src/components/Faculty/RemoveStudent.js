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
  //   Select,
  Textarea,
  DrawerFooter,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Badge,
} from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const RemoveStudent = ({ allUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studentUsername, setStudentUsername] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  const toast = useToast();

  const useroptions = [];
  allUsers.map((eachuser) => {
    if (eachuser.user_role.role_name != "faculty") {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.username;
      useroptions.push(user);
    }

    // console.log();
  });
  console.log(useroptions);
  const getallusers = async () => {
    await axios
      .get(`http://localhost:1337/api/users`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getallusers();
  }, []);

  const handlesubmit = (e) => {
    setStudentUsername(e.value);
  };

  const removeStudent = async () => {
    await axios
      .delete(`http://localhost:1337/api/users/${studentUsername}`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then((res) => {
        console.log("deleted user", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const btnRef = React.useRef();
  return (
    <>
      <Button ref={btnRef} colorScheme="red" size="md" onClick={onOpen}>
        Remove a student from the portal
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
          <DrawerHeader>Remove a student from the portal</DrawerHeader>

          <DrawerBody>
            <label htmlFor="id">
              Select a student to be removed from the portal
            </label>
            <Select
              onChange={handlesubmit}
              id="name"
              isMulti={false}
              options={useroptions}
            />
          </DrawerBody>

          <DrawerFooter>
            {/* {console.log(studentUsername)} */}
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={
                studentUsername ===
                JSON.parse(localStorage.getItem("userdata")).id
                  ? true
                  : false
              }
              onClick={removeStudent}
              colorScheme="red"
            >
              {studentUsername ===
              JSON.parse(localStorage.getItem("userdata")).id
                ? "You cannot delete yourself"
                : "Remove this student from the portal"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default RemoveStudent;
