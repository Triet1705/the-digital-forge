import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./features/layout/header/Header";
import Footer from "./features/layout/footer/Footer";
import "./App.css";

function App() {
  const location = useLocation();
  const isLightHeader = location.pathname.startsWith("/models");

  return (
    <div className="App">
      <Header variant={isLightHeader ? "light" : "dark"} />
      <main className="mainContent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
