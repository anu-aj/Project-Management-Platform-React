import "./App.css";
// Pages & Components imports
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import RedirectUser from "./pages/RedirectUser";

// Base dashboards for each user role
import Staffpage from "./pages/Staffpage";
import Studentpage from "./pages/Studentpage";

// Routing imports
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";

// React imports
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  // const handleLogin = () => setUser({ id: "1", name: "Robin" });
  // const handleLogout = () => setUser(null);
  return (
    <div className="App">
      {/* {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )} */}

      <BrowserRouter>
        {/* <Link to="dashboard">Click me</Link> */}
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route
            path="redirect"
            element={
              <PrivateRoute>
                <RedirectUser user={user} />
              </PrivateRoute>
            }
          />
          {/* Staff Dashboard */}
          <Route
            path="faculty-dashboard"
            element={
              <PrivateFaculty>
                <Staffpage />
              </PrivateFaculty>
            }
          />
          {/* Student Dashboard */}
          <Route
            path="student-dashboard"
            element={
              <PrivateStudent>
                <Studentpage />
              </PrivateStudent>
            }
          />
          <Route
            path="*"
            element={<p>Yaarna irukeengala Amaidhiya irukudhu!!!</p>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// custom hook for auth state
const useAuth = () => {
  const cuser = localStorage.getItem("userdata");
  if (cuser) {
    return true;
  } else {
    return false;
  }
};

// handle faculty routes
const useFaculty = () => {
  const auth = useAuth();
  const role = localStorage.getItem("user-role");
  if (auth) {
    if (role === "faculty" || role === "Faculty" || role === "FACULTY") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Handle Student Routes
const useStudent = () => {
  const auth = useAuth();
  const role = localStorage.getItem("user-role");
  if (auth) {
    if (role === "student" || role === "Student" || role === "STUDENT") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// Handle private routes
function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/" />;
}

// handle only staff accessible routes
function PrivateFaculty({ children }) {
  const isFaculty = useFaculty();
  return isFaculty ? children : <Navigate to="/" />;
}

// handle only student accessible routes
function PrivateStudent({ children }) {
  const isStudent = useStudent();
  return isStudent ? children : <Navigate to="/" />;
}

export default App;
