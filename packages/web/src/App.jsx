import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

const Header = () => (
  <header
    style={{ padding: "20px", backgroundColor: "#f0f0f0", textAlign: "center" }}
  >
    HEADER PLACEHOLDER
  </header>
);
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
