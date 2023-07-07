import React from "react";
import "./output.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Leftbar from "./components/Leftbar";
import Rightbar from "./components/Rightbar";
import Home from "./components/Home";

const App = () => {
  let currentUser = "123";

  const Layout = () => {
    return (
      <div>
        <Nav />
        <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5">
          <Leftbar />
          <Outlet />
          <Rightbar />
        </div>
      </div>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
