import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { mockCars } from "../../../../../api/mockCars";
import Typography from "../../../components/ui/typography/Typography";
import Icon from "../../../components/ui/icon/icon";
import "swiper/css";
import styles from "./CarSwiper.module.scss";

const CarSwiper = () => {
  return (
    <section className={styles.swiperSection}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
        className={styles.carSwiper}
      >
        {mockCars.map((car) => (
          <SwiperSlide key={car.sku} className={styles.swiperSlide}>
            <div className={styles.slideInner}>
              <div className={styles.slideTextContent}>
                <Typography
                  variant="h2"
                  component="h3"
                  className={styles.carName}
                >
                  {car.name}
                </Typography>
                <Typography variant="h3" className={styles.carSlogan}>
                  {car.descriptionTitle}
                </Typography>
              </div>
              <div className={styles.slideImageContainer}>
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className={styles.slideImage}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`${styles.swiperButton} ${styles.hexagon}  ${styles.swiperButtonPrev}`}
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
