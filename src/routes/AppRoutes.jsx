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
import ProfilePage from "../pages/my-profile/ProfilePage";
import PlaygroundsPage from "../pages/playgrounds/PlaygroundsPage";
import SinglePlaygroundPage from "../pages/playgrounds/components/SinglePlaygroundPage";
import PlaygroundFormPage from "../pages/playgrounds/components/PlaygroundFormPage";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";
import WalletPage from "../pages/wallet/WalletPage";
import ReservationsPage from "../pages/playgrounds/components/ReservationsPage";
import Dashboard from "../pages/dashboard/Dashboard";
import ProfileFormPage from "../pages/my-profile/components/ProfileFormPage";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsAndConditions from "../pages/legal/TermsAndConditions";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CanRegisterPage />} />
        <Route path="/register/new-user" element={<RegisterPage />} />
        <Route path="/login/resetPassword" element={<ForgetPasswordPage />} />
        {/* <Route path="/reset" element={<ResetPasswordFormPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route
          path="/dashboard"
          element={
            <AuthenticatorRoute>
              <MainLayout />
            </AuthenticatorRoute>
          }
        >
          {/* Dashboard */}
          <Route path="" element={<Dashboard />} />

          {/* Profile Settings */}
          <Route path="my-profile" element={<ProfilePage />} />
          <Route path="my-profile/edit" element={<ProfileFormPage />} />

          {/* Stores */}
          <Route path="stores" element={<StoresPage />} />
          <Route path="stores/:storeId" element={<SingleStorPage />} />
          <Route
            path="stores/:storeId/edit"
            element={<StoreFormPage isEditForm />}
          />
          <Route path="stores/add" element={<StoreFormPage />} />

          {/* products */}
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

          {/* Orders */}
          <Route path="stores/:storeId/orders" element={<OrdersPage />} />
          <Route
            path="stores/:storeId/orders/:orderId"
            element={<SingleOrderPage />}
          />

          {/* Playgrunds */}
          <Route path="playgrounds" element={<PlaygroundsPage />} />
          <Route
            path="playgrounds/:playgroundId"
            element={<SinglePlaygroundPage />}
          />
          <Route
            path="playgrounds/:playgroundId/reservations"
            element={<ReservationsPage />}
          />
          <Route
            path="playgrounds/:playgroundId/edit"
            element={<PlaygroundFormPage isEditForm />}
          />
          <Route path="playgrounds/add" element={<PlaygroundFormPage />} />
          <Route path="wallet" element={<WalletPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
