import React from "react";
import CarSwiper from "../features/homepage/swiper/CarSwiper";
import Icon from "../components/ui/icon/Icon";
import Button from "../components/ui/button/Button";
import HeroSection from "../features/homepage/hero-section/HeroSection";
import ModelGrid from "../features/homepage/model-card/ModelGrid";
import { mockCars } from "../../../api/mockCars";

const HomePage = () => {
  const cars = mockCars;
  return (
    <div>
      <HeroSection />
      <CarSwiper cars={cars} />
      <ModelGrid models={cars} />
    </div>
  );
};

export default HomePage;
