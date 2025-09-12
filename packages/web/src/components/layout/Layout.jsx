import React from "react";
import clsx from "clsx";
import styles from "./Layout.module.scss";

const Layout = ({ variant = "fullwidth", sidebar, children }) => {
  return (
    <div className={clsx(styles.container, styles[variant])}>
      {variant === "sidebar" && (
        <aside className={styles.sidebarSlot}>{sidebar}</aside>
      )}
      <main className={styles.mainSlot}>{children}</main>
    </div>
  );
};

export default Layout;
