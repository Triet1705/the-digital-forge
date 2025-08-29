import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Icon from "../../../components/ui/icon/Icon";
import CarSlide from "../car-slide/CarSlide";
import "swiper/css";
import styles from "./CarSwiper.module.scss";

const CarSwiper = ({ cars }) => {
  if (!cars || cars.length === 0) return null;

  const loopedCars = [
    ...cars,
    ...cars.map((car) => ({ ...car, sku: `${car.sku}-loop` })),
  ];
  return (
    <section className={styles.swiperSection}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
        className={styles.carSwiper}
        grabCursor={true}
        speed={600}
      >
        {loopedCars.map((car, index) => (
          <SwiperSlide
            key={`${car.sku}-${index}`}
            className={styles.swiperSlide}
          >
            <CarSlide car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`${styles.swiperButton} ${styles.hexagon} ${styles.swiperButtonPrev}`}
      >
        <Icon name="arrowLeft" size={28} />
      </div>
      <div
        className={`${styles.swiperButton} ${styles.hexagon} ${styles.swiperButtonNext}`}
      >
        <Icon name="arrowRight" size={28} />
      </div>
    </section>
  );
};

export default CarSwiper;
