import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AuthPage from "./Pages/AuthPage";
import HashedUrlPage from "./Pages/HashedUrlPage";
import ToastComp from "./Components/Toast";
import ProfilePage from "@/Pages/ProfilePage/index";
import ErrorPage from "./Pages/ErrorPage";
import { useAppSelector } from "./utils";

export const AppRoutes = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  console.log("isLoggedIn approutes: ", isLoggedIn);
  return (
    <>
      <ToastComp />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfileProtectedRoute />}>
          <Route path="" element={<ProfilePage />} />
        </Route>

        <Route path="/redirectTo/:hashedUrl" element={<HashedUrlPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

const ProfileProtectedRoute = () => {
  console.log("ProfileProtectedRoute");
  const { isLoggedIn } = useAppSelector((state) => state.user);
  console.log("isLoggedIn: ");

  return isLoggedIn ? <Outlet /> : <Navigate to={"/auth"} replace />;
};
