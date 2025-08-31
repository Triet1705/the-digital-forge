import React, { useState } from "react";
import clsx from "clsx";
import styles from "./ModelGrid.module.scss";
import ModelCard from "./ModelCard";
import { useCars } from "../../../hooks/usecases/useCars";

const chunkArray = (array, size) => {
  if (!array) return [];
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const ModelGrid = () => {
  const { cars, isLoading, isError, error } = useCars();
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [hoveredCardSku, setHoveredCardSku] = useState(null);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "#fff" }}>
        Loading Models...
      </div>
    );
  }
  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: "80px", color: "red" }}>
        Error: {error.message}
      </div>
    );
  }

  const carRows = chunkArray(cars, 2);

  return (
    <div className={styles.gridContainer}>
      {carRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={styles.row}
          onMouseEnter={() => setHoveredRowIndex(rowIndex)}
          onMouseLeave={() => {
            setHoveredRowIndex(null);
            setHoveredCardSku(null);
          }}
        >
          {row.map((car) => (
            <div
              key={car.sku}
              className={clsx(styles.cardWrapper, {
                [styles.isHovered]: hoveredCardSku === car.sku,
                [styles.isShrunk]:
                  hoveredRowIndex === rowIndex &&
                  hoveredCardSku !== null &&
                  hoveredCardSku !== car.sku,
              })}
              onMouseEnter={() => setHoveredCardSku(car.sku)}
            >
              <ModelCard car={car} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ModelGrid;
