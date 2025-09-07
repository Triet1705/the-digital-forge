import React from "react";
import styles from "./FilterSidebar.module.scss";
import Typography from "../../components/ui/typography/Typography";
import Button from "../../components/ui/button/Button";
import Collapse from "../../components/ui/collapse/Collapse";
import RadioInput from "../../components/ui/radio/RadioInput";
import CheckboxInput from "../../components/ui/checkbox/CheckboxInput";

const bodyTypeFilters = [
  { id: "coupe", name: "Coupé", count: 5 },
  { id: "roadster", name: "Roadster", count: 5 },
];

const FilterSidebar = ({
  cars = [],
  selectedCarSku,
  onFilterChange,
  onResetFilters,
}) => {
  const allVersionsCount = cars.reduce(
    (total, car) => total + car.versions.length,
    0
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <Typography variant="h3" component="h6" className={styles.sectionTitle}>
          Models
        </Typography>
        <div className={styles.radioGroup}>
          <RadioInput
            label="All"
            name="model"
            value="All"
            checked={selectedCarSku === "All"}
            onChange={(e) => onFilterChange(e.target.value)}
            count={allVersionsCount}
          />
          {cars.map((car) => (
            <RadioInput
              key={car.sku}
              label={car.name}
              name="model"
              value={car.sku}
              checked={selectedCarSku === car.sku}
              onChange={(e) => onFilterChange(e.target.value)}
              count={car.versions.length}
            />
          ))}
        </div>
      </div>

      <Collapse title="Body Design">
        <div className={styles.checkboxGroup}>
          {bodyTypeFilters.map((item) => (
            <CheckboxInput
              key={item.id}
              label={item.name}
              name={item.id}
              count={item.count}
            />
          ))}
        </div>
      </Collapse>

      <Button
        variant="outlined"
        className={styles.resetButton}
        onClick={onResetFilters}
      >
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterSidebar;
