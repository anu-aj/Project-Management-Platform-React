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
  // Select,
  Textarea,
  DrawerFooter,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import * as qs from "qs";
import { useState, useEffect } from "react";
import Select from "react-select";

const ProjectEdit = ({ eachproject, users_involved, curuser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allUsers, setAllUsers] = useState([]);
  const [studentID, setStudentID] = useState([]);
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [Department, setDept] = useState("");
  const firstField = React.useRef();

  const getallusers = async () => {
    // query to get role
    const query = qs.stringify(
      {
        populate: ["user_role"],
      },
      {
        encodeValuesOnly: true,
      }
    );
    await axios
      .get(`http://localhost:1337/api/users?${query}`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then((res) => {
        console.log("Users list", res.data);
        setAllUsers(res.data);
        // setRole(res.data.user_role.role_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const teamoptions = [];
  const defoptions = [];
  const reqarray = [];

  users_involved.map((eachuser) => {
    if (
      eachuser.attributes.user_role.data.attributes.role_name === "student" ||
      eachuser.attributes.user_role.data.attributes.role_name === "faculty"
    ) {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.attributes.username;
      defoptions.push(user);
    }
  });

  allUsers.map((eachuser) => {
    if (eachuser.user_role.role_name === "student") {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.username;
      teamoptions.push(user);
    }
  });

  const handlesubmitteam = (teamoptions) => {
    setStudentID(teamoptions);
  };

  const handledept = (deptoptions) => {
    setDept(deptoptions.value);
  };

  studentID.map((eachstudent) => {
    const studentID = eachstudent.value;
    reqarray.push(studentID);
  });

  const defreqarray = [];
  defoptions.map((eachoptions) => {
    defreqarray.push(eachoptions.value);
  });

  const deptoptions = [
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
    { value: "IT", label: "IT" },
    { value: "MECH", label: "MECH" },
  ];

  //   Update project details function
  const [projectname, setProjectName] = useState("");
  const [projectdesc, setProjectDesc] = useState("");
  // const [dept, setDept] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  //   let selectgrp = document.getElementById("dept");
  //   let updateddept = selectgrp.options[selectgrp.selectedIndex].value;
  //   dept = dept.toUpperCase();
  const updatedProjectPayload = {
    data: {
      project_name: projectname ? projectname : eachproject.project_name,
      Dept: Department ? Department : eachproject.Dept,
      project_description: projectdesc
        ? projectdesc
        : eachproject.project_description,
      users_involved: reqarray.length == 0 ? defreqarray : reqarray,
    },
  };
  // console.log("users involved", users_involved);
  console.log("total payload", updatedProjectPayload);
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

  useEffect(() => {
    // getProjectDetails();
    getallusers();
  }, []);
  return (
    <>
      <>
        <Button size="sm" onClick={onOpen}>
          Edit project
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          size="lg"
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
                    options={deptoptions}
                    isMulti={false}
                    defaultValue={
                      eachproject.Dept
                        ? { value: eachproject.Dept, label: eachproject.Dept }
                        : { value: "CSE", label: "CSE" }
                    }
                    onChange={handledept}
                  />
                  {/* <option value="cse">CSE</option>
                    <option value="ece">ECE</option>
                    <option value="it">IT</option>
                    <option value="mech">MECH</option> */}
                  {/* </Select> */}
                </Box>
              </Stack>
              <Stack mt="5">
                <Box>
                  <FormLabel htmlFor="team selection">
                    Edit this project's team (Don't remove yourself from the
                    team)
                  </FormLabel>
                  <Select
                    isMulti={true}
                    onChange={handlesubmitteam}
                    defaultValue={defoptions}
                    options={teamoptions}
                  />
                </Box>
              </Stack>
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
