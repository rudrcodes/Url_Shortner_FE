import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AuthPage from "./Pages/AuthPage";
import HashedUrlPage from "./Pages/HashedUrlPage";
import ToastComp from "./Components/Toast";

export const AppRoutes = () => {
  return (
    <>
      <ToastComp />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/redirectTo/:hashedUrl" element={<HashedUrlPage />} />
      </Routes>
    </>
  );
};
