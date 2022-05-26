import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
const DashBoard = ({ user }) => {
  //   if (!user) {
  //     return <Navigate to="/" replace />;
  //   }
  return (
    <div>
      {user.id} {user.username} is authenticated
      {user ? (
        <h1>You are successfully logged in!</h1>
      ) : (
        <h1>You are not authorized</h1>
      )}
      <h1>
        <Link to="/">Back to Home</Link>
      </h1>
    </div>
  );
};

export default DashBoard;
