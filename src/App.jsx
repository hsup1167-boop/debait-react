// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./components/ForgotPassword";

// Private Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import StartDebate from "./pages/StartDebate";

// UI
import Header from "./components/Header";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PRIVATE ROUTES WITH HEADER */}
      <Route
        path="/home"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />

      <Route
        path="/explore"
        element={
          <>
            <Header />
            <Explore />
          </>
        }
      />

      <Route
        path="/about"
        element={
          <>
            <Header />
            <About />
          </>
        }
      />

      <Route
        path="/start"
        element={
          <>
            <Header />
            <StartDebate />
          </>
        }
      />
    </Routes>
  );
}
