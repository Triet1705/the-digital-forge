import React from "react";
import clsx from "clsx";
import styles from "./Tag.module.scss";

const Tag = ({
  children,
  variant = "primary", // 'primary', 'hybrid', 'gasoline', 'electric'
  className,
}) => {
  const tagClasses = clsx(styles.tag, styles[variant], className);

  return <span className={tagClasses}>{children}</span>;
};

export default Tag;
