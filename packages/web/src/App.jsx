import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./features/layout/header/Header";
import Footer from "./features/layout/footer/Footer";
import "./App.css";

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
