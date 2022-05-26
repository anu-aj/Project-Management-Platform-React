import React from "react";
import sistimg from "../imgs/sist1.jpg";
import Navbar from "../components/Navbar";
import "../App.css";
const myStyle = {
  backgroundImage: `url(${sistimg})`,
  height: "100vh",
  fontSize: "30px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="Home" style={myStyle}>
        <div class="centered_typing">
          <div class="wrapper_type_head">
            <div class="typing-demo_head">Project Management Platform</div>
          </div>
        </div>
      </div>
    </>
  );
}
