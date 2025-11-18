// src/components/Header.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Header() {
  const navigate = useNavigate();

  const tabClass = ({ isActive }) =>
    "tab" + (isActive ? " active" : "");

  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header>
      <div className="header-top">
        <div>
          <div className="logo">
            Deb<span>AI</span>t
          </div>
          <div className="tagline">
            Debate with AI. Practice critical thinking.
          </div>
        </div>

        <button className="theme-toggle" onClick={toggleDark}>
          🌙 / ☀️
        </button>

        <button className="theme-toggle" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <nav className="tabs">
        <NavLink to="/home" className={tabClass}>Home</NavLink>
        <NavLink to="/start" className={tabClass}>Start Debate</NavLink>
        <NavLink to="/explore" className={tabClass}>Explore</NavLink>
        <NavLink to="/about" className={tabClass}>About</NavLink>
      </nav>
    </header>
  );
}
