import { Route, Routes } from "react-router";
import AuthenticatorRoute from "./AuthenticatorRoute";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import StoresPage from "../pages/stores/StoresPage";
import SingleStorPage from "../pages/stores/components/SingleStorPage";
import CanRegisterPage from "../pages/auth/CanRegisterPage";
import Products from "../pages/stores/products/Products";
import ProductFormPage from "../pages/stores/products/components/ProductFormPage";
import SingleProduct from "../pages/stores/products/components/SingleProduct";
import StoreFormPage from "../pages/stores/components/StoreFormPage";
import OrdersPage from "../pages/stores/orders/OrdersPage";
import SingleOrderPage from "../pages/stores/orders/components/SingleOrderPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CanRegisterPage />} />
        <Route path="/register/new-user" element={<RegisterPage />} />
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
        >
          <Route path="stores" element={<StoresPage />} />
          <Route path="stores/:storeId" element={<SingleStorPage />} />
          <Route
            path="stores/:storeId/edit"
            element={<StoreFormPage isEditForm />}
          />
          <Route path="stores/add" element={<StoreFormPage />} />
          <Route path="stores/:storeId/products" element={<Products />} />
          <Route
            path="stores/:storeId/products/add"
            element={<ProductFormPage />}
          />
          <Route
            path="stores/:storeId/products/:productId/edit"
            element={<ProductFormPage isEditForm />}
          />
          <Route
            path="stores/:storeId/products/:productId"
            element={<SingleProduct />}
          />
          <Route path="stores/:storeId/orders" element={<OrdersPage />} />
          <Route
            path="stores/:storeId/orders/:orderId"
            element={<SingleOrderPage />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
