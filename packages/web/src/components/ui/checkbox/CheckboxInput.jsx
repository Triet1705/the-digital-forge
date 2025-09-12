import React from "react";
import styles from "./CheckboxInput.module.scss";
import CheckIcon from "../../../assets/icons/CheckIcon";

const CheckboxInput = ({ label, name, value, checked, onChange, count }) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.nativeCheckbox}
      />
      <span className={styles.customCheckbox}>
        <CheckIcon width={24} height={24} />
      </span>
      <span className={styles.labelText}>{label}</span>
      {count !== undefined && <span className={styles.count}>({count})</span>}
    </label>
  );
};

export default CheckboxInput;
