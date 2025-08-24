import React from "react";
import Typography from "../../../components/ui/typography/Typography";
import Button from "../../../components/ui/button/Button";
import styles from "./HeroSection.module.scss";

const heroBackgroundImage = "/assets/images/background/porsche_taycan.webp";

const HeroSection = () => {
  return (
    <section
      className={styles.heroSection}
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <Typography variant="caption" className={styles.projectTag}>
          Project: The Digital Forge
        </Typography>
        <Typography variant="h1" component="h1" className={styles.headline}>
          YOU CAN'T HIDE
          <br />
          WHO YOU ARE
        </Typography>
        <Typography variant="subtitle1" className={styles.subheadline}>
          Experience the future of automotive excellence. Where performance
          meets artistry, and innovation defines possibility.
        </Typography>
        <div className={styles.actions}>
          <Button variant="outlined" className={` ${styles.heroOutlinedWhite}`}>
            Discover All Models
          </Button>
          <Button variant="outlined" className={` ${styles.heroOutlinedWhite}`}>
            <Typography>Build Yours →</Typography>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
