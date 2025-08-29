import React from "react";
import styles from "./ModelGrid.module.scss";
import Tag from "../../../components/ui/tag/Tag";
import Icon from "../../../components/ui/icon/Icon";

const ModelCard = ({ car }) => {
  const showcaseImage = car.imageSet?.showcase || "";
  const titleImage = car.imageSet?.title || "";
  const firstVersion = car.versions[0];

  return (
    <div
      className={styles.gridCard}
      style={{ backgroundImage: `url(${showcaseImage})` }}
    >
      <div className={styles.titleContent}></div>
      {titleImage && (
        <img
          src={titleImage}
          alt={car.name}
          className={styles.titleImage}
          data-car-name={car.name.toLowerCase()}
        />
      )}

      <div className={styles.overlay}></div>
      <div className={styles.cardContent}>
        <div className={styles.tags}>
          {car.fuelType.map((type) => (
            <Tag key={type} variant={type.toLowerCase()}>
              {type}
            </Tag>
          ))}
        </div>
        <p className={styles.description}>{firstVersion.description}</p>
        <div className={styles.exploreLink}>
          <span>Explore</span>
          <Icon name="arrowRight" size={16} />
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
