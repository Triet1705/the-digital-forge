import React from "react";
import CarSwiper from "../features/homepage/swiper/CarSwiper";
import Icon from "../components/ui/icon/Icon";
import Button from "../components/ui/button/Button";
import HeroSection from "../features/homepage/hero-section/HeroSection";
import ModelGrid from "../features/homepage/model-card/ModelGrid";
// import { mockCars } from "../../../api/mockCars";
import { useCars } from "../hooks/usecases/useCars";

const HomePage = () => {
  const { cars, isLoading, isError } = useCars();
  if (isLoading) {
    return <div>Loading Page...</div>;
  }
  if (isError) {
    return <div>Error loading page data!</div>;
  }
  return (
    <div>
      <HeroSection />
      <CarSwiper cars={cars} />
      <ModelGrid />
    </div>
  );
};

export default HomePage;
