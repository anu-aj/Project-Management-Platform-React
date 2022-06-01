import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Project from "../components/Project";
import {
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Createstudent from "../components/Createstudent";
import RemoveStudent from "../components/RemoveStudent";
import EditStudent from "../components/EditStudent";
import * as qs from "qs";

const Staffpage = () =>
  // { user }
  {
    // const [upuser, setUser] = useState(user ? user : JSON.parse(localStorage.getItem()));
    const [projects_undertaken, setProjectsUndertaken] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const curJWT = JSON.parse(localStorage.getItem("jwt"));
    const user = JSON.parse(localStorage.getItem("userdata"));
    const userrole = localStorage.getItem("user-role");
    const [Role, setRole] = useState("");

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
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // useEffect(() => {
    //   getallusers();
    // }, []);
    const getProjectDetails = async () => {
      await axios
        .get(`http://localhost:1337/api/users/${user.id}/?populate=*`, {
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
    useEffect(() => {
      // function call
      // if (user == null) {
      //   // setUser
      //   setUser(JSON.parse(localStorage.getItem("userdata")));
      // } else {
      getProjectDetails();
      getallusers();
      // }
    }, []);

    return (
      <div>
        <Navbar />
        {Role === "faculty" && userrole === "faculty" ? (
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              px="10"
            >
              <Box></Box>
              <Menu>
                <MenuButton as={Button}>Control Dock ⏬</MenuButton>
                <MenuList>
                  <MenuItem>
                    <Createstudent />
                  </MenuItem>
                  <MenuItem>
                    <RemoveStudent allUsers={allUsers} />
                  </MenuItem>
                  <MenuItem>
                    <EditStudent allUsers={allUsers} />
                  </MenuItem>
                  {/* <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem> */}
                </MenuList>
              </Menu>
            </Box>

            <Text fontSize="4xl">Welcome {user.username}</Text>
            {/* {console.log(projects_undertaken)} */}
            <Text fontSize="2xl">
              These are the projects you are involved in
            </Text>
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
          </>
        ) : (
          <>
            <Text>
              You are registered as student, please use{" "}
              <Link to="/student-dashboard">your own dashboard.</Link>
            </Text>
          </>
        )}
      </div>
    );
  };

export default Staffpage;
