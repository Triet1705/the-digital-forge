import React from "react";
import styles from "./RadioInput.module.scss";

const RadioInput = ({ label, name, value, checked, onChange, count }) => {
  return (
    <div className={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.nativeRadio}
      />
      <span className={styles.customRadio}></span>
      <span className={styles.labelText}>{label}</span>
      {count !== undefined && <span className={styles.count}>({count})</span>}
    </div>
  );
};
