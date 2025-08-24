import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./features/layout/header/Header";
import "./App.css";

const Footer = () => (
  <footer
    style={{
      padding: "20px",
      backgroundColor: "#333",
      color: "white",
      textAlign: "center",
    }}
  >
    FOOTER PLACEHOLDER
  </footer>
);

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
