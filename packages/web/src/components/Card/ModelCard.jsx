import React from "react";
import styles from "./ModelCard.module.scss";
import Typography from "../ui/typography/Typography";
import Button from "../ui/button/Button";

import Tag from "../ui/tag/Tag";

import Image from "../image/Image";

const ModelCard = ({ car, version }) => {
  let imageUrl = "";
  if (
    version &&
    version.showcaseImages &&
    version.showcaseImages.configuratorCard &&
    version.showcaseImages.configuratorCard.length > 0
  ) {
    imageUrl = version.showcaseImages.configuratorCard[0];
  }

  // Dùng console.log để debug nếu ảnh vẫn không hiện
  console.log(`Rendering card for ${version.name}, imageUrl is: ${imageUrl}`);

  const fuelType = car?.fuelType?.[0] || "";
  const baseSpecs = version?.baseSpecs || [];

  const mainSpecs = baseSpecs.filter((spec) => spec.value);
  const subDescriptions = baseSpecs.filter((spec) => !spec.value);

  return (
    <div className={styles.card}>
      <div className={styles.tagsContainer}>
        {fuelType && <Tag variant={fuelType.toLowerCase()}>{fuelType}</Tag>}
      </div>

      <div className={styles.imageContainer}>
        <Image src={imageUrl} alt={version.name} />
      </div>

      <div className={styles.content}>
        <Typography variant="h3" component="h4" className={styles.title}>
          {version.name}
        </Typography>

        {subDescriptions.map((desc, index) => (
          <Typography
            key={index}
            variant="caption"
            className={styles.subDescription}
          >
            {desc.label}
          </Typography>
        ))}

        {/* --- BƯỚC 2: FIX LAYOUT SPECS THÀNH 1 CỘT DỌC --- */}
        <div className={styles.specs}>
          {mainSpecs.map((spec, index) => (
            <div key={index} className={styles.specItem}>
              <Typography
                variant="h2"
                component="p"
                className={styles.specValue}
              >
                {spec.value}
              </Typography>
              <Typography variant="caption" className={styles.specLabel}>
                {spec.label}
              </Typography>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="primary">Select model</Button>
          <Button variant="outlined">Compare</Button>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
