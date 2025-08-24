import React from "react";
import clsx from "clsx";
import styles from "./Typography.module.scss";

const variantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  subtitle1: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
};

const Typography = ({
  children,
  variant = "body1",
  component,
  className,
  ...props
}) => {
  const Component = component || variantMapping[variant] || "span";

  const typoClasses = clsx(styles.typography, styles[variant], className);

  return (
    <Component className={typoClasses} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
