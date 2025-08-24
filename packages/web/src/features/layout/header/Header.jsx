// packages/web/src/features/layout/header/Header.jsx
import React from "react";
import Icon from "../../../components/ui/icon/icon";
import Typography from "../../../components/ui/typography/Typography";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Icon name="menu" size={28} />
        <Typography variant="body2" className={styles.menuText}>
          MENU
        </Typography>
      </div>
      <div className={styles.centerSection}></div>
      <div className={styles.rightSection}>
        <Icon name="search" size={24} />
      </div>
    </header>
  );
};

export default Header;
