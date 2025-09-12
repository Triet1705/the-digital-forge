import React, { useMemo } from "react";
import styles from "./FilterSidebar.module.scss";
import Typography from "../../components/ui/typography/Typography";
import Button from "../../components/ui/button/Button";
import Collapse from "../../components/ui/collapse/Collapse";
import RadioInput from "../../components/ui/radio/RadioInput";
import CheckboxInput from "../../components/ui/checkbox/CheckboxInput";
import {
  FUEL_TYPE_OPTIONS,
  BODY_TYPE_OPTIONS,
  SEAT_OPTIONS,
} from "../../../constants/filters";

const FilterSidebar = ({
  cars = [],
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const allVersionsCount = cars.reduce(
    (total, car) => total + car.versions.length,
    0
  );
  const handleCheckboxChange = (event, filterType) => {
    const { name, checked } = event.target;
    onFilterChange(filterType, { ...filters[filterType], [name]: checked });
  };

  const filterCounts = useMemo(() => {
    if (!cars) return { fuelTypes: {}, bodyTypes: {}, seats: {} };

    const counts = {
      fuelTypes: Object.fromEntries(FUEL_TYPE_OPTIONS.map((o) => [o.id, 0])),
      bodyTypes: Object.fromEntries(BODY_TYPE_OPTIONS.map((o) => [o.id, 0])),
      seats: Object.fromEntries(SEAT_OPTIONS.map((o) => [o.id, 0])),
    };

    for (const car of cars) {
      for (const version of car.versions) {
        car.fuelType?.forEach((type) => {
          if (counts.fuelTypes[type] !== undefined) counts.fuelTypes[type]++;
        });
        version.bodyType?.forEach((type) => {
          if (counts.bodyTypes[type] !== undefined) counts.bodyTypes[type]++;
        });
        version.seats?.forEach((type) => {
          if (counts.seats[type] !== undefined) counts.seats[type]++;
        });
      }
    }
    return counts;
  }, [cars]);

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
            checked={filters.carSku === "All"}
            onChange={(e) => onFilterChange("carSku", e.target.value)}
            count={allVersionsCount}
          />
          {cars.map((car) => (
            <RadioInput
              key={car.sku}
              label={car.name}
              name="model"
              value={car.sku}
              checked={filters.carSku === car.sku}
              onChange={(e) => onFilterChange("carSku", e.target.value)}
              count={car.versions.length}
            />
          ))}
        </div>
      </div>

      <Collapse title="Body Design">
        <div className={styles.checkboxGroup}>
          {BODY_TYPE_OPTIONS.map((item) => (
            <CheckboxInput
              key={item.id}
              label={item.name}
              name={item.id}
              count={filterCounts.bodyTypes[item.id]}
              onChange={(e) => handleCheckboxChange(e, "bodyTypes")}
            />
          ))}
        </div>
      </Collapse>

      <Collapse title="Seats">
        <div className={styles.checkboxGroup}>
          {SEAT_OPTIONS.map((item) => (
            <CheckboxInput
              key={item.id}
              label={item.name}
              name={item.id}
              count={filterCounts.seats[item.id]}
              checked={filters.seats[item.id] || false}
              onChange={(e) => handleCheckboxChange(e, "seats")}
            />
          ))}
        </div>
      </Collapse>

      <Collapse title="Fuel Type">
        <div className={styles.checkboxGroup}>
          {FUEL_TYPE_OPTIONS.map((item) => (
            <CheckboxInput
              key={item.id}
              label={item.name}
              name={item.id}
              count={filterCounts.fuelTypes[item.id]}
              checked={filters.fuelTypes[item.id] || false}
              onChange={(e) => handleCheckboxChange(e, "fuelTypes")}
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
