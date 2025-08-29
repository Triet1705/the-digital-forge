// packages/web/src/features/layout/footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Typography from "../../../components/ui/typography/Typography";
import Icon from "../../../components/ui/icon/icon";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.column}>
            <Typography variant="h3" component="h6">
              Models
            </Typography>
            <Link to="/models/911" className={styles.link}>
              911
            </Link>
            <Link to="/models/taycan" className={styles.link}>
              Taycan
            </Link>
            <Link to="/models/panamera" className={styles.link}>
              Panamera
            </Link>
            <Link to="/models/cayenne" className={styles.link}>
              Cayenne
            </Link>
          </div>
          <div className={styles.column}>
            <Typography variant="h3" component="h6">
              Company
            </Typography>
            <Link to="/about" className={styles.link}>
              About TDF
            </Link>
            <Link to="/contact" className={styles.link}>
              Contact
            </Link>
            <Link to="/careers" className={styles.link}>
              Careers
            </Link>
          </div>
          <div className={styles.column}>
            <Typography variant="h3" component="h6">
              Social Media
            </Typography>
            <Typography variant="body2" className={styles.socialText}>
              Get in touch with us via social media.
            </Typography>
            <div className={styles.socialIcons}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Icon name="facebook" size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Icon name="instagram" size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Icon name="youtube" size={24} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <Icon name="twitterX" size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <Typography variant="caption">
            © {new Date().getFullYear()} The Digital Forge. All Rights Reserved.
            This is a non-commercial project for educational purposes.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
