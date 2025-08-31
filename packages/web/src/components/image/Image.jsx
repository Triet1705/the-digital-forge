import React from "react";
import clsx from "clsx";
import styles from "./Image.module.scss";

const Image = ({
  src,
  alt = "The Digital Forge Image",
  className,
  ...props
}) => {
  const handleError = (e) => {};

  return (
    <img
      src="src"
      alt="alt"
      className={clsx(styles.image, className)}
      loading="lazy"
      onError={handleError}
      {...props}
    />
  );
};

export default Image;
