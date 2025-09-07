import React from "react";
import styles from "./RadioInput.module.scss";

const RadioInput = ({ label, name, value, checked, onChange, count }) => {
  const id = `radio-${name}-${value}`;
  return (
    <div className={styles.radioLabel}>
      <label htmlFor={id} className={styles.radioLabel}>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={styles.nativeRadio}
        />
        <span className={styles.customRadio}></span>
        <span className={styles.labelText}>{label}</span>
        {count !== undefined && <span className={styles.count}>({count})</span>}
      </label>
    </div>
  );
};

export default RadioInput;
