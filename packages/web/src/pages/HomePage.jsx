import React from "react";
import CarSwiper from "../features/homepage/swiper/CarSwiper";
import Icon from "../components/ui/icon/Icon";
import Button from "../components/ui/button/Button";
import HeroSection from "../features/homepage/hero-section/HeroSection";
import ModelGrid from "../features/homepage/model-card/ModelGrid";
import { mockCars } from "../../../api/mockCars";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CarSwiper />
      <ModelGrid models={mockCars} />
    </div>
  );
};

export default HomePage;
