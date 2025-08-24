import React from "react";
import CarSwiper from "../features/homepage/CarSwiper";
import Icon from "../components/ui/icon/icon";
import Button from "../components/ui/button/Button";

const HomePage = () => {
  return (
    <div>
      <CarSwiper />

      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Component Test Area</h2>
        <Button variant="primary">
          Test Button <Icon name="arrowRight" size={20} />
        </Button>
        <div style={{ marginTop: "20px" }}>
          <Icon name="arrowLeft" size={30} />
          <span style={{ margin: "0 20px" }}>Testing Icons</span>
          <Icon name="arrowRight" size={30} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
