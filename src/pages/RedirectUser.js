import { React, useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import * as qs from "qs";
import axios from "axios";
import { useToast, Box } from "@chakra-ui/react";
import Loading from "../components/utils/Loading";
const RedirectUser = ({ user }) => {
  const toast = useToast();
  // current user state
  const [curuser, setCuruser] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  // current user's JWT
  const [curJWT, setCurJWT] = useState(JSON.parse(localStorage.getItem("jwt")));

  // current user's role
  const [Role, setRole] = useState("");
  // get user role
  const getuserdata = async () => {
    const query = qs.stringify(
      {
        populate: ["user_role"],
      },
      {
        encodeValuesOnly: true,
      }
    );
    await axios
      .get(`http://localhost:1337/api/users/${curuser.id}?${query}`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then(function (response) {
        // console.log("fetched personal relationship data");
        // set role from the response to Role variable
        setRole(response.data.user_role.role_name);
        localStorage.setItem("user-role", response.data.user_role.role_name);
      })
      .catch(function (error) {
        // console.log(error);
        return toast({
          title: "Error on Role designation",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    getuserdata();
  }, []);
  return (
    <div>
      {Role === "faculty" ? (
        <div>
          <Navigate to="/faculty-dashboard" replace />
        </div>
      ) : Role === "student" ? (
        <div>
          <Navigate to="/student-dashboard" replace />
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}

      {/* <p>Name : {curuser.username}</p>
      <p>ID : {curuser.id}</p>
      <p>Role : {Role}</p>
      <p>Email : {curuser.email}</p>

      <div>
        You are going to be redirected to{" "}
        {Role === "faculty" ? "faculty" : "student"} dashboard.....
      </div>
      <h1>
        <Link to="/">Back to Home</Link>
      </h1> */}
    </div>
  );
};

export default RedirectUser;
