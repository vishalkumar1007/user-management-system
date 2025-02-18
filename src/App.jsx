import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import UserAuth from "./pages/UserAuth/UserAuth";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import UserManagement from "./pages/UserManagement/UserManagement";
import UpdateUserProfile from "./components/UpdateUserProfile/UpdateUserProfile";
import { LoadUserManagementContext } from "./context/LoadUserManagementContext";

function App() {
  return (
    <LoadUserManagementContext>
      <BrowserRouter basename="/user-management-system">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<UserAuth />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/UpdateUserProfile" element={<UpdateUserProfile />} />
        </Routes>
      </BrowserRouter>
    </LoadUserManagementContext>
  );
}

export default App;
