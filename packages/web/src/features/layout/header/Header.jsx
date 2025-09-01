// packages/web/src/features/layout/header/Header.jsx
import React from "react";
import Icon from "../../../components/ui/icon/Icon";
import Typography from "../../../components/ui/typography/Typography";
import styles from "./Header.module.scss";
import clsx from "clsx";

const Header = ({ variant = "dark" }) => {
  return (
    <header className={clsx(styles.header, styles[variant])}>
      <div className={styles.leftSection}>
        <Icon name="menu" size={28} />
        <Typography variant="body2" className={styles.menuText}>
          MENU
        </Typography>
      </div>
      <div className={styles.centerSection}></div>
      <div className={styles.rightSection}>
        <Icon name="search" size={24} />
        <Icon name="person" size={32} />
      </div>
    </header>
  );
};

export default Header;
