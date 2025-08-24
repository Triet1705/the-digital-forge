import React from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className,
  ...props
}) => {
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
