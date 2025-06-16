import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import AuthPage from "./Pages/AuthPage";

function App() {
  //if logged in then route them to home , else route them to login page
  return (
    <div className="flex justify-start items-center bg-[] h-screen w-screen flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
