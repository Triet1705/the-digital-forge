import React from "react";
import clsx from "clsx";
import { ICONS } from "../../../constants/icons";
import styles from "./Icon.module.scss";
import { ICON_MAP } from "./IconMap";

const Icon = ({ name, size = 24, className, ...props }) => {
  const iconClasses = clsx(styles.icon, className);

  const IconComponent = ICON_MAP[name];

  if (IconComponent) {
    return (
      <IconComponent
        width={size}
        height={size}
        className={iconClasses}
        {...props}
      />
    );
  }

  const simpleIconData = ICONS[name];
  if (simpleIconData) {
    return (
      <svg
        className={iconClasses}
        width={size}
        height={size}
        viewBox={simpleIconData.viewBox || "0 0 24 24"}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        {...props}
      >
        <path d={simpleIconData.path} />
      </svg>
    );
  }

  return null;
};

export default Icon;
