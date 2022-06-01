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
import React from "react";
import { useState } from "react";
// import Select from "react-select";

const ProjectEdit = ({ eachproject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const deptoptions = [
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
    { value: "IT", label: "IT" },
    { value: "MECH", label: "MECH" },
  ];
  //   Update project details function
  const [projectname, setProjectName] = useState("");
  const [projectdesc, setProjectDesc] = useState("");
  const [dept, setDept] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  //   let selectgrp = document.getElementById("dept");
  //   let updateddept = selectgrp.options[selectgrp.selectedIndex].value;
  //   dept = dept.toUpperCase();
  const updatedProjectPayload = {
    data: {
      project_name: projectname ? projectname : eachproject.project_name,
      Dept: dept ? dept.toUpperCase() : eachproject.Dept,
      project_description: projectdesc
        ? projectdesc
        : eachproject.project_description,
    },
  };
  console.log(updatedProjectPayload);
  const updateProject = async () => {
    await axios
      .put(
        `http://localhost:1337/api/projects/${eachproject.id}`,
        updatedProjectPayload,
        {
          headers: {
            Authorization: `Bearer ${curJWT}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <>
        <Button size="sm" onClick={onOpen}>
          Edit project
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Edit Project Details
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <Text
                    bgColor="green.200"
                    p="2"
                    mb="5"
                    rounded="lg"
                    textAlign="center"
                    size="sm"
                  >
                    You are editing {eachproject.project_name}
                  </Text>
                  <FormLabel htmlFor="username">Project Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="projectname"
                    // value={eachproject.project_name}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                    placeholder={eachproject.project_name}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea
                    placeholder={eachproject.project_description}
                    onChange={(e) => {
                      setProjectDesc(e.target.value);
                    }}
                    id="desc"
                  />
                </Box>
                {/* <Box>
                  <FormLabel htmlFor="url">Url</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>http://</InputLeftAddon>
                    <Input
                      type="url"
                      id="url"
                      placeholder="Please enter domain"
                    />
                    <InputRightAddon>.com</InputRightAddon>
                  </InputGroup>
                </Box> */}

                <Box>
                  <FormLabel htmlFor="dept">Edit Department</FormLabel>
                  <Select
                    id="dept"
                    // options={deptoptions}
                    // isMulti={false}
                    defaultValue={
                      eachproject.Dept ? eachproject.Dept.toLowerCase() : "CSE"
                    }
                    onChange={(e) => {
                      setDept(e.target.value);
                    }}
                  >
                    <option value="cse">CSE</option>
                    <option value="ece">ECE</option>
                    <option value="it">IT</option>
                    <option value="mech">MECH</option>
                  </Select>
                </Box>
              </Stack>
              {/* <Stack mt="5">
                <Box>
                  <FormLabel htmlFor="users_involved">
                    <Select options={options} />
                  </FormLabel>
                </Box>
              </Stack> */}
            </DrawerBody>
            {/* <Text p="2" fontSize="sm">
              <Badge>Note:</Badge>These changes can also be done in student end
              too. However faculty will have control over all data.
            </Text> */}
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={updateProject} colorScheme="blue">
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default ProjectEdit;
