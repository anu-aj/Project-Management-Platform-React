import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
import * as qs from "qs";
import axios from "axios";
import Project from "../components/Project";
import { Link } from "react-router-dom";

const StudentDashboard = (userl) => {
  const [projects_undertaken, setProjectsUndertaken] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  const userlo = JSON.parse(localStorage.getItem("userdata"));
  const userrole = localStorage.getItem("user-role");
  const [Role, setRole] = useState("");
  // const [userlval, setUserl] = useState({});
  // const newuserinfo = userl.id;
  // get all users
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
        // console.log("Users list", res.data);
        setAllUsers(res.data);
        // setRole(res.data.user_role.role_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get all projects
  const getProjectDetails = async () => {
    await axios
      .get(`http://localhost:1337/api/users/${userlo.id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then(function (response) {
        console.log("fetched projects......");
        // console.log(response.data.projects_undertaken);
        setProjectsUndertaken(response.data.projects_undertaken);
        setRole(response.data.user_role.role_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // calling the projects
  useEffect(() => {
    getProjectDetails();
    getallusers();
  }, []);
  return (
    <>
      <Navbar />
      {/* {console.log("data from login page", newuserinfo)} */}
      {/* {console.log(Role)} */}
      {Role === "student" && userrole === "student" ? (
        <Box>
          <Text fontSize="4xl">Welocome {userlo.username}</Text>
          <Text fontSize="2xl">These are the projects you are involved</Text>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            flexWrap="wrap"
          >
            {projects_undertaken.map((each) => {
              return (
                <Box>
                  <Project key={each.id} eachproject={each} />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        <>
          <Text>
            You are registered as staff, please use{" "}
            <Link to="/faculty-dashboard">your own dashboard.</Link>
          </Text>
        </>
      )}

      <Box></Box>
    </>
  );
};

export default StudentDashboard;
