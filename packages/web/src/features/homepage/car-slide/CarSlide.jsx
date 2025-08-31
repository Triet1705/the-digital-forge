import { React, useState } from "react";
import Typography from "../../../components/ui/typography/Typography";
import VersionDisplay from "../version-display/VersionDisplay";
import styles from "../swiper/CarSwiper.module.scss";

const CarSlide = ({ car }) => {
  const [selectedVersion, setSelectedVersion] = useState(car.versions[0]);

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
  };

  if (!selectedVersion) return null;

  return (
    <div className={styles.slideContentWrapper}>
      <div className={styles.titleWrapper}>
        <Typography variant="h2" component="h3" className={styles.carName}>
          {car.name}
        </Typography>
        <Typography variant="h2" className={styles.carSlogan}>
          {selectedVersion.descriptionTitle}
        </Typography>
      </div>

      <div className={styles.slideImageContainer}>
        <img
          src={selectedVersion.imageUrl}
          alt={selectedVersion.name}
          className={styles.slideImage}
        />
      </div>

      <div className={styles.versionWrapper}>
        <VersionDisplay
          versions={car.versions}
          selectedVersion={selectedVersion}
          onVersionSelect={handleVersionSelect}
        />
      </div>
    </div>
  );
};

export default CarSlide;
