import "./App.css";
// Pages & Components imports
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
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
            path="dashboard"
            element={
              <PrivateRoute>
                <DashBoard user={user} />
              </PrivateRoute>
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

// Handle private routes
function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/" />;
}

export default App;
