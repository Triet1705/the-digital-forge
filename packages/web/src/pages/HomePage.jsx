import React from "react";
import CarSwiper from "../features/homepage/swiper/CarSwiper";
import Icon from "../components/ui/icon/Icon";
import Button from "../components/ui/button/Button";
import HeroSection from "../features/homepage/hero-section/HeroSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CarSwiper />
    </div>
  );
};

export default HomePage;
