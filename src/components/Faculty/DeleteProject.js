import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  useColorMode,
  Badge,
  Text,
  Stack,
  Button,
  Flex,
  Spacer,
  Checkbox,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const DeleteProject = ({ eachproject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkboxstate, setCheckboxState] = useState(false);
  const [email, setEmail] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  const useremail = JSON.parse(localStorage.getItem("userdata"));
  const toast = useToast();
  // delete project
  const deleteProject = async () => {
    if (checkboxstate === true && email === useremail.email) {
      axios
        .delete(`http://localhost:1337/api/projects/${eachproject.id}`, {
          headers: {
            Authorization: `Bearer ${curJWT}`,
          },
        })
        .then((res) => {
          console.log(res);
          toast({
            title: "Student Deleted Successfully...",
            description: `Status : ${res.status}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setCheckboxState(false);
          onClose();
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Student Deletion Failed...",
            description: `Status : ${err.status}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
    }
  };
  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Delete Project
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="red.200">
          <ModalHeader>Delete Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Checkbox
              isRequired={true}
              onChange={() => {
                setCheckboxState(!checkboxstate);
              }}
            >
              I hereby understand that this completely erases all the data
              associated with the project called as{" "}
              <strong>{eachproject.project_name}</strong>. This change is
              irreverisible and permanent.
            </Checkbox>
            <FormLabel htmlFor="email" mt="5">
              Confirm by typing your email below
            </FormLabel>
            <Input
              type="email"
              bgColor="white"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email..."
            />
          </ModalBody>
          <ModalFooter gap="2">
            {console.log(checkboxstate)}
            <Button
              disabled={
                checkboxstate === true && email === useremail.email
                  ? false
                  : true
              }
              size="sm"
              colorScheme="red"
              onClick={deleteProject}
            >
              DELETE PROJECT
            </Button>
            <Button size="sm" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProject;
