import React from "react";
import clsx from "clsx";
import { ICONS } from "../../../constants/icons";
import styles from "./Icon.module.scss";

const Icon = ({ name, size = 24, className, ...props }) => {
  const iconData = ICONS[name];

  if (!iconData) {
    return null;
  }

  const iconClasses = clsx(styles.icon, className);

  return (
    <svg
      className={iconClasses}
      width={size}
      height={size}
      viewBox={iconData.viewBox || "0 0 24 24"}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={iconData.path} />
    </svg>
  );
};

export default Icon;
