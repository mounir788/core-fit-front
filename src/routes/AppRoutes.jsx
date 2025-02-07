import { Route, Routes } from "react-router";
import AuthenticatorRoute from "./AuthenticatorRoute";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/login/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/reset" element={<ResetPasswordFormPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <AuthenticatorRoute>
              <MainLayout />
            </AuthenticatorRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
